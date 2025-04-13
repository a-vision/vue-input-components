<template>
  <div class="file-upload-test">
    <div class="header">
      <router-link to="/" class="back-link">
        <font-awesome-icon icon="home" />
        <span>Back to Dashboard</span>
      </router-link>
      <h1>File Upload Test</h1>
    </div>
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
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2070');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.file-upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.upload-section {
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
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

.group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}

.error {
  color: var(--error-color);
  background-color: var(--error-color-light);
  border: 1px solid var(--error-color);
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-color);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--primary-color);
}

h1 {
  margin: 0;
  color: #212529;
}
</style>
