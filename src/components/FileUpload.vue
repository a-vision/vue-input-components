<template>
  <div class="file-upload">
    <div
      class="upload-area"
      :class="{ 'is-dragging': isDragging, 'has-files': files.length > 0 }"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input ref="fileInput" type="file" multiple class="file-input" @change="handleFileSelect" />
      <div class="upload-content">
        <font-awesome-icon :icon="['fas', icon || 'upload']" />
        <p v-if="files.length === 0">Drag & drop files here or click to select</p>
        <div v-else class="selected-files">
          <p>{{ files.length }} file(s) selected</p>
          <div v-for="(file, index) in files" :key="index" class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="uploadProgress > 0 && uploadProgress < 100" class="progress-bar">
      <div class="progress" :style="{ width: `${uploadProgress}%` }"></div>
    </div>
    <div v-if="uploadStatus" class="status-message" :class="uploadStatus.type">
      {{ uploadStatus.message }}
    </div>
    <button v-if="files.length > 0 && !uploadUrl" class="upload-button" @click="handleStartUpload">
      Upload Files
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  icon?: string
  uploadUrl?: string
}>()

const emit = defineEmits<{
  (e: 'upload-complete', files: File[]): void
  (e: 'upload-error', error: string): void
  (e: 'files-selected', files: File[]): void
  (e: 'start-upload', files: File[]): void
}>()

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB in bytes
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref<File[]>([])
const isDragging = ref(false)
const uploadProgress = ref(0)
const error = ref('')
const uploadStatus = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const validateFileSize = (file: File): boolean => {
  if (file.size > MAX_FILE_SIZE) {
    error.value = `File "${file.name}" exceeds the maximum size of 20MB`
    return false
  }
  return true
}

const handleDragEnter = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  error.value = ''
  if (e.dataTransfer?.files) {
    const newFiles = Array.from(e.dataTransfer.files)
    if (newFiles.every(validateFileSize)) {
      files.value = [...files.value, ...newFiles]
    }
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (e: Event) => {
  error.value = ''
  const input = e.target as HTMLInputElement
  if (input.files) {
    const newFiles = Array.from(input.files)
    if (newFiles.every(validateFileSize)) {
      files.value = [...files.value, ...newFiles]
    }
  }
  input.value = ''
}

const uploadFiles = async () => {
  if (!props.uploadUrl) {
    error.value = 'No upload URL provided'
    return
  }

  if (files.value.length === 0) {
    error.value = 'No files selected'
    return
  }

  const formData = new FormData()
  files.value.forEach((file) => {
    formData.append('files', file)
  })

  try {
    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        uploadProgress.value = (e.loaded / e.total) * 100
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        uploadStatus.value = {
          type: 'success',
          message: 'Upload completed successfully',
        }
        emit('upload-complete', files.value)
        files.value = []
        uploadProgress.value = 0
      } else {
        throw new Error(`Upload failed with status ${xhr.status}`)
      }
    })

    xhr.addEventListener('error', () => {
      throw new Error('Upload failed')
    })

    xhr.open('POST', props.uploadUrl)
    xhr.send(formData)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Upload failed'
    error.value = errorMessage
    uploadStatus.value = {
      type: 'error',
      message: errorMessage,
    }
    emit('upload-error', errorMessage)
  }
}

const handleStartUpload = () => {
  emit('start-upload', files.value)
}

// Watch for changes in files and automatically upload when files are selected
watch(files, (newFiles) => {
  if (newFiles.length > 0) {
    if (props.uploadUrl) {
      uploadFiles()
    } else {
      emit('files-selected', newFiles)
    }
  }
})
</script>

<style scoped>
.file-upload {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.upload-area {
  border: 2px dashed var(--upload-border-color);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--upload-bg-color);
}

.upload-area.is-dragging {
  border-color: var(--upload-dragging-border-color);
  background-color: var(--upload-dragging-bg-color);
}

.upload-area.has-files {
  border-color: var(--upload-has-files-border-color);
  background-color: var(--upload-has-files-bg-color);
}

.file-input {
  display: none;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-content :deep(svg) {
  font-size: 2rem;
  color: var(--upload-icon-color);
}

.selected-files {
  width: 100%;
  text-align: left;
  max-height: 200px;
  overflow-y: auto;
  font-size: 0.75rem;
  color: var(--upload-text-color);
}

.file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.125rem 0;
  border-radius: 0.25rem;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.5rem;
}

.file-size {
  font-size: 0.7rem;
  flex-shrink: 0;
}

.error-message {
  color: var(--error-text-color);
  margin-top: 1rem;
  font-size: 0.875rem;
}

.progress-bar {
  height: 0.5rem;
  background-color: var(--progress-bg-color);
  border-radius: 0.25rem;
  margin-top: 1rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: var(--progress-color);
  transition: width 0.3s ease;
}

.status-message {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.status-message.success {
  background-color: var(--success-bg-color);
  color: var(--success-text-color);
}

.status-message.error {
  background-color: var(--error-bg-color);
  color: var(--error-text-color);
}

.upload-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: var(--primary-color-light);
}
</style>
