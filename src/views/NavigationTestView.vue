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
import Navigation from '@/components/Navigation.vue'

const activeDefaultItem = ref('')
const activeTabsItem = ref('')
const activeDropdownItem = ref('')
const activeCustomItem = ref('')

const lastClicked = ref({
  default: null,
  tabs: null,
  dropdown: null,
  custom: null,
})

const defaultItems = [
  {
    id: 'home',
    label: '',
    icon: 'img:/src/assets/logo.svg',
    width: '150px',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: '/dashboard',
    icon: 'gauge-high',
    width: '150px',
  },
  {
    id: 'reports',
    label: 'Reports',
    disabled: true,
    icon: 'chart-simple',
    width: '150px',
  },
  {
    id: 'spacer',
    label: '',
    width: 'auto',
  },
  {
    id: 'messages',
    label: 'Messages',
    alignment: 'right',
    icon: 'envelope',
    width: '150px',
    children: [
      {
        id: 'inbox',
        label: 'Inbox',
      },
      {
        id: 'sent',
        label: 'Sent',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    alignment: 'right',
    icon: 'sliders',
    width: '150px',
    children: [
      {
        id: 'profile',
        label: 'Profile',
      },
      {
        id: 'security',
        label: 'Security',
      },
    ],
  },
]

const mixedAlignmentItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: '/dashboard',
    icon: 'gauge-high',
  },
  {
    id: 'spacer',
    label: '',
    width: 'auto',
  },
  {
    id: 'settings',
    label: 'Settings',
    alignment: 'right',
    icon: 'sliders',
    children: [
      {
        id: 'profile',
        label: 'Profile',
      },
      {
        id: 'security',
        label: 'Security',
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    disabled: true,
    alignment: 'right',
  },
  {
    id: 'messages',
    label: 'Messages',
    children: [
      {
        id: 'inbox',
        label: 'Inbox',
      },
      {
        id: 'sent',
        label: 'Sent',
      },
    ],
  },
]

const dropdownItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: '/dashboard',
    alignment: 'start',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    alignment: 'start',
    children: [
      {
        id: 'overview',
        label: 'Overview',
      },
      {
        id: 'reports',
        label: 'Reports',
      },
      {
        id: 'export',
        label: 'Export',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    alignment: 'end',
    children: [
      {
        id: 'profile',
        label: 'Profile',
      },
      {
        id: 'security',
        label: 'Security',
      },
      {
        id: 'notifications',
        label: 'Notifications',
      },
    ],
  },
]

const customItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: '/dashboard',
    alignment: 'start',
  },
  {
    id: 'projects',
    label: 'Projects',
    alignment: 'start',
    children: [
      {
        id: 'active',
        label: 'Active',
      },
      {
        id: 'archived',
        label: 'Archived',
      },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    alignment: 'end',
    children: [
      {
        id: 'members',
        label: 'Members',
      },
      {
        id: 'roles',
        label: 'Roles',
      },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    alignment: 'end',
    disabled: true,
  },
]

const handleDefaultClick = (item) => {
  console.log('Default navigation clicked:', item)
  lastClicked.value.default = item
  if (item.url) {
    console.log('Navigating to:', item.url)
  }
}

const handleTabsClick = (item) => {
  console.log('Tabs navigation clicked:', item)
  lastClicked.value.tabs = item
  if (item.url) {
    console.log('Navigating to:', item.url)
  }
}

const handleDropdownClick = (item) => {
  console.log('Dropdown navigation clicked:', item)
  lastClicked.value.dropdown = item
  if (item.url) {
    console.log('Navigating to:', item.url)
  }
}

const handleCustomClick = (item) => {
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
