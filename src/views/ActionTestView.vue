<template>
  <div class="action-test">
    <div class="navigation">
      <router-link to="/" class="back-link">
        <font-awesome-icon icon="arrow-left" />
        <span>Back to Dashboard</span>
      </router-link>
    </div>

    <div class="content">
      <h1>Action Component Test</h1>

      <div class="color-controls">
        <div class="color-picker">
          <label for="action-color">Action Color:</label>
          <input type="color" id="action-color" v-model="actionColor" />
        </div>
      </div>

      <div class="test-section">
        <h2>Basic Actions</h2>
        <div class="action-group">
          <Action
            icon="save"
            label="Save"
            :color="actionColor"
            variant="transparent"
            @click="handleActionClick('Save')"
          />
          <Action
            icon="trash"
            label="Delete"
            :color="actionColor"
            @click="handleActionClick('Delete')"
          />
          <Action
            icon="edit"
            label="Edit"
            :color="actionColor"
            @click="handleActionClick('Edit')"
          />
        </div>
      </div>

      <div class="test-section">
        <h2>Icon Only Actions</h2>
        <div class="action-group">
          <Action icon="plus" :color="actionColor" @click="handleActionClick('Add')" />
          <Action icon="search" :color="actionColor" @click="handleActionClick('Search')" />
          <Action icon="cog" :color="actionColor" @click="handleActionClick('Settings')" />
        </div>
      </div>

      <div class="test-section">
        <h2>Label Only Actions</h2>
        <div class="action-group">
          <Action
            label="Submit"
            type="submit"
            :color="actionColor"
            size="large"
            @click="handleActionClick('Submit')"
          />
          <Action label="Cancel" :color="actionColor" @click="handleActionClick('Cancel')" />
          <Action
            label="Reset"
            type="reset"
            :color="actionColor"
            size="small"
            @click="handleActionClick('Reset')"
          />
        </div>
      </div>

      <div class="test-section">
        <h2>Link Actions</h2>
        <div class="action-group">
          <Action
            icon="external-link"
            label="View Details"
            href="/details"
            :color="actionColor"
            size="large"
            @click="handleActionClick('View Details')"
          />
          <Action
            icon="download"
            label="Download"
            href="/download"
            :color="actionColor"
            @click="handleActionClick('Download')"
          />
          <Action
            label="Share"
            href="/share"
            :color="actionColor"
            size="small"
            @click="handleActionClick('Share')"
          />
        </div>
      </div>

      <div class="test-section">
        <h2>Disabled Actions</h2>
        <div class="action-group">
          <Action
            icon="lock"
            label="Locked"
            disabled
            :color="actionColor"
            @click="handleActionClick('Locked')"
          />
          <Action
            icon="check"
            label="Completed"
            disabled
            :color="actionColor"
            @click="handleActionClick('Completed')"
          />
          <Action
            icon="ban"
            label="Disabled"
            disabled
            :color="actionColor"
            @click="handleActionClick('Disabled')"
          />
        </div>
      </div>

      <div class="test-section">
        <h2>Mixed Actions</h2>
        <div class="action-group">
          <Action
            icon="plus"
            label="Add New"
            :color="actionColor"
            @click="handleActionClick('Add New')"
          />
          <Action icon="trash" :color="actionColor" @click="handleActionClick('Delete')" />
          <Action label="Cancel" :color="actionColor" @click="handleActionClick('Cancel')" />
          <Action
            icon="external-link"
            label="View"
            href="/view"
            :color="actionColor"
            @click="handleActionClick('View')"
          />
        </div>
      </div>

      <div class="test-section">
        <h2>Action Log</h2>
        <div class="action-log">
          <div v-for="(log, index) in actionLog" :key="index" class="log-entry">
            {{ log }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Action from '../components/Action.vue'

const actionLog = ref<string[]>([])
const actionColor = ref('#4CAF50')

const handleActionClick = (action: string) => {
  actionLog.value.unshift(`[${new Date().toLocaleTimeString()}] Clicked: ${action}`)
  if (actionLog.value.length > 10) {
    actionLog.value.pop()
  }
}
</script>

<style scoped>
.action-test {
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.action-test::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.navigation {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  transition: opacity 0.2s ease;
}

.back-link:hover {
  opacity: 0.8;
}

.color-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.color-picker {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.color-picker label {
  font-size: 0.875rem;
  color: white;
}

.color-picker input[type='color'] {
  width: 100%;
  height: 2.5rem;
  padding: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
}

.test-section {
  margin-bottom: 3rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
}

h1 {
  margin-bottom: 2rem;
  color: white;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
  color: white;
}

.action-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.action-log {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  padding: 1rem;
  max-height: 200px;
  overflow-y: auto;
}

.log-entry {
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: monospace;
  font-size: 0.875rem;
  color: white;
}

.log-entry:last-child {
  border-bottom: none;
}
</style>
