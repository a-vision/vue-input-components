<template>
  <div class="navigation-test">
    <div class="navigation-test__back">
      <router-link to="/" class="back-link"> ← Back to Dashboard </router-link>
    </div>

    <div class="navigation-test__section">
      <h2>Tiles Navigation (Default)</h2>
      <Navigation
        :items="defaultItems"
        type="tiles"
        orientation="horizontal"
        v-model:activeItem="activeDefaultItem"
        @item-click="handleDefaultClick"
        iconSize="large"
        height="90px"
        backgroundColor="#fff"
        activeBackgroundColor="var(--background-color)"
      />
      <div v-if="lastClicked.default" class="click-info">
        Last clicked: {{ lastClicked.default.url || `id:${lastClicked.default.id}` }}
      </div>
    </div>

    <div class="navigation-test__section">
      <h2>Tabs Navigation (Mixed Alignment)</h2>
      <Navigation
        :items="mixedAlignmentItems"
        type="tiles"
        orientation="horizontal"
        v-model:activeItem="activeTabsItem"
        @item-click="handleTabsClick"
        height="2em"
        showBottomBorder
      />
      <div v-if="lastClicked.tabs" class="click-info">
        Last clicked: {{ lastClicked.tabs.label }}
        <span v-if="lastClicked.tabs.alignment">({{ lastClicked.tabs.alignment }} aligned)</span>
      </div>
    </div>

    <div class="navigation-test__section">
      <h2>Dropdown Navigation (Vertical)</h2>
      <Navigation
        :items="dropdownItems"
        type="dropdowns"
        orientation="vertical"
        v-model:activeItem="activeDropdownItem"
        @item-click="handleDropdownClick"
        :showIcons="false"
        color="#805ad5"
        hoverColor="#6b46c1"
        activeColor="#553c9a"
        disabledColor="#b794f4"
        gap="0.5rem"
        padding="0.75rem 1rem"
        borderRadius="6px"
      />
      <div v-if="lastClicked.dropdown" class="click-info">
        Last clicked: {{ lastClicked.dropdown.label }}
        <span v-if="lastClicked.dropdown.children"
          >(has {{ lastClicked.dropdown.children.length }} children)</span
        >
      </div>
    </div>

    <div class="navigation-test__section">
      <h2>Custom Styled Navigation</h2>
      <Navigation
        :items="customItems"
        type="tiles"
        orientation="horizontal"
        v-model:activeItem="activeCustomItem"
        @item-click="handleCustomClick"
        :showIcons="false"
        color="#4a90e2"
        hoverColor="#357abd"
        activeColor="#2c5a8c"
        disabledColor="#a0c4e8"
        gap="1.5rem"
        padding="1rem 2rem"
        borderRadius="8px"
      />
      <div v-if="lastClicked.custom" class="click-info">
        Last clicked: {{ lastClicked.custom.label }}
        <span v-if="lastClicked.custom.disabled">(disabled)</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NavigationItem } from '../types/navigation'
import Navigation from '@/components/Navigation.vue'

const activeDefaultItem = ref('')
const activeTabsItem = ref('')
const activeDropdownItem = ref('')
const activeCustomItem = ref('')

const lastClicked = ref<Record<string, NavigationItem>>({
  default: {} as NavigationItem,
  tabs: {} as NavigationItem,
  dropdown: {} as NavigationItem,
  custom: {} as NavigationItem,
})

const defaultItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'house',
    width: '150px',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: '/dashboard',
    hideExternalOpen: true,
    icon: 'gauge-high',
    width: '200px',
    labelSize: 'large',
  },
  {
    id: 'spacer',
    label: '',
    width: '1fr',
  },
  {
    id: 'about',
    label: 'About',
    url: 'https://example.com',
    icon: 'info',
    alignment: 'right',
    width: '150px',
    children: [
      {
        id: 'about-1',
        label: 'About 1',
        icon: 'info',
      },
      {
        id: 'about-2',
        label: 'About 2',
        icon: 'square-up-right',
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'envelope',
    width: '150px',
    alignment: 'right',
    labelSize: 'small',
  },
]

const mixedAlignmentItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    url: 'https://example.com',
    icon: 'house',
  },
  {
    id: 'about',
    label: 'About',
    width: '200px',
    children: [
      {
        id: 'about-1',
        label: 'About 1',
      },
      {
        id: 'about-2',
        label: 'About 2',
      },
    ],
  },
  {
    id: 'spacer',
    label: '',
    width: '1fr',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'envelope',
    alignment: 'right',
  },
]

const dropdownItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    url: 'https://example.com',
    alignment: 'start',
  },
  {
    id: 'about',
    label: 'About',
    alignment: 'start',
    children: [
      {
        id: 'about-1',
        label: 'About 1',
      },
      {
        id: 'about-2',
        label: 'About 2',
      },
    ],
  },
]

const customItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    url: 'https://example.com',
    alignment: 'start',
  },
  {
    id: 'about',
    label: 'About',
    alignment: 'start',
    children: [
      {
        id: 'about-1',
        label: 'About 1',
      },
      {
        id: 'about-2',
        label: 'About 2',
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'envelope',
    alignment: 'end',
    disabled: true,
  },
]

const handleDefaultClick = (item: NavigationItem) => {
  console.log('Default navigation clicked:', item)
  lastClicked.value.default = item
  if (item.url) {
    console.log('Navigating to:', item.url)
  }
}

const handleTabsClick = (item: NavigationItem) => {
  console.log('Tabs navigation clicked:', item)
  lastClicked.value.tabs = item
  if (item.url) {
    console.log('Navigating to:', item.url)
  }
}

const handleDropdownClick = (item: NavigationItem) => {
  console.log('Dropdown navigation clicked:', item)
  lastClicked.value.dropdown = item
  if (item.url) {
    console.log('Navigating to:', item.url)
  }
}

const handleCustomClick = (item: NavigationItem) => {
  console.log('Custom navigation clicked:', item)
  lastClicked.value.custom = item
  if (item.url) {
    console.log('Navigating to:', item.url)
  }
}
</script>

<style scoped>
.navigation-test {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.navigation-test__back {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  color: #357abd;
}

.navigation-test__section {
  margin-bottom: 3rem;
}

.navigation-test__section h2 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
}

.click-info {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #4a5568;
}
</style>
