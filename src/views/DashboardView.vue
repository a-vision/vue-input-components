<template>
  <div class="dashboard">
    <router-link to="/text-input-test" class="tile">
      <font-awesome-icon icon="keyboard" size="2x" />
      <span>Text Inputs Test</span>
    </router-link>
    <router-link to="/file-upload-test" class="tile">
      <font-awesome-icon icon="upload" size="2x" />
      <span>File Upload Test</span>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.dashboard {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  place-items: center;
  padding: 2rem;
}

.tile {
  display: grid;
  grid-template-rows: auto auto;
  gap: 1rem;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 200px;
  text-decoration: none;
}

.tile:hover {
  background: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tile svg {
  color: #495057;
}

.tile span {
  font-weight: 500;
  color: #495057;
  text-align: center;
}
</style>
