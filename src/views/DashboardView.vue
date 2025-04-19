<template>
  <div class="dashboard">
    <h1>Vue Input Components</h1>
    <div class="tile-grid">
      <router-link to="/text-input" class="tile">
        <div class="tile-content">
          <font-awesome-icon icon="keyboard" class="tile-icon" />
          <h2>Text Input</h2>
          <p>Test the text input component with various configurations</p>
        </div>
      </router-link>
      <router-link to="/file-upload" class="tile">
        <div class="tile-content">
          <font-awesome-icon icon="file-upload" class="tile-icon" />
          <h2>File Upload</h2>
          <p>Test the file upload component with drag and drop support</p>
        </div>
      </router-link>
      <router-link to="/action" class="tile">
        <div class="tile-content">
          <font-awesome-icon icon="hand-pointer" class="tile-icon" />
          <h2>Action</h2>
          <p>Test the action component with various button and link styles</p>
        </div>
      </router-link>
      <router-link to="/navigation" class="tile">
        <div class="tile-content">
          <font-awesome-icon icon="bars" class="tile-icon" />
          <h2>Navigation</h2>
          <p>Test the navigation component</p>
        </div>
      </router-link>
      <router-link to="/dropdown" class="tile">
        <div class="tile-content">
          <font-awesome-icon icon="chevron-down" class="tile-icon" />
          <h2>Dropdown</h2>
          <p>Test the dropdown component with single/multiple selection and filtering</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tile {
  text-decoration: none;
  color: inherit;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tile-content {
  padding: 2rem;
  text-align: center;
}

.tile-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

.tile h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.tile p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.5;
}
</style>
