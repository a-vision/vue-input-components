<template>
  <div class="file-upload-test">
    <h1>File Upload Test</h1>
    <div class="file-upload-grid">
      <div class="upload-section">
        <h2>Basic Upload</h2>
        <FileUpload
          icon="upload"
          upload-url="https://httpbin.org/post"
          @upload-complete="handleUploadComplete"
          @upload-error="handleUploadError"
        />
        <div
          v-if="uploadStatus.basic && uploadStatus.basic.message"
          :class="['status-message', uploadStatus.basic.type]"
        >
          {{ uploadStatus.basic.message }}
        </div>
      </div>
      <div class="upload-section">
        <h2>Image Upload</h2>
        <FileUpload
          icon="image"
          @files-selected="handleFilesSelected"
          @start-upload="handleStartUpload"
        />
      </div>
      <div class="upload-section">
        <h2>Document Upload</h2>
        <FileUpload icon="file" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'

interface UploadStatus {
  type: 'success' | 'error'
  message: string
}

const uploadStatus = ref<Record<string, UploadStatus>>({
  basic: { type: 'success', message: '' },
})

const handleUploadComplete = (files: File[]) => {
  uploadStatus.value.basic = {
    type: 'success',
    message: `Successfully uploaded ${files.length} file(s)`,
  }
  // Clear status after 3 seconds
  setTimeout(() => {
    uploadStatus.value.basic.message = ''
  }, 3000)
}

const handleUploadError = (error: string) => {
  uploadStatus.value.basic = {
    type: 'error',
    message: error,
  }
  // Clear status after 3 seconds
  setTimeout(() => {
    uploadStatus.value.basic.message = ''
  }, 3000)
}

const handleFilesSelected = (files: File[]) => {
  console.log('Files selected:', files)
}

const handleStartUpload = (files: File[]) => {
  console.log('Start upload:', files)
}
</script>

<style scoped>
.file-upload-test {
  padding: 2rem;
}

.file-upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.upload-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
}

.upload-section h2 {
  margin-bottom: 1rem;
  color: #495057;
}

.status-message {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
