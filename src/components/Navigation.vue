<template>
  <nav
    :class="[
      'navigation',
      `navigation--${type}`,
      `navigation--${orientation}`,
      { 'navigation--show-icons': showIcons },
    ]"
    :style="{
      '--navigation-color': color,
      '--navigation-hover-color': hoverColor,
      '--navigation-active-color': activeColor,
      '--navigation-disabled-color': disabledColor,
      '--navigation-gap': gap,
      '--navigation-padding': padding,
      '--navigation-border-radius': borderRadius,
      '--navigation-height': height,
      '--navigation-width': width,
      '--navigation-background-color': backgroundColor,
      '--navigation-active-background-color': activeBackgroundColor || 'rgba(0, 0, 0, 0.1)',
    }"
  >
    <template v-if="type === 'tiles'">
      <div class="navigation__tiles">
        <div
          v-for="(item, index) in sortedItems"
          :key="item.id"
          class="navigation__tile"
          :class="[
            { 'navigation__tile--active': item.id === activeItem },
            { 'navigation__tile--disabled': item.disabled },
            { 'navigation__tile--right': item.alignment === 'right' },
            { 'navigation__tile--open': isDropdownOpen(item.id) },
          ]"
          :style="{
            '--item-alignment': item.alignment || activeItemAlignment,
            width: item.width || '200px',
            'min-width': item.width || '200px',
            'max-width': item.width || '200px',
            'grid-column': `span ${Math.ceil(parseInt(item.width || '200px') / 200)}`,
          }"
          @click="(e) => handleItemClick(item, e)"
        >
          <div class="navigation__tile-content">
            <div v-if="showIcons && item.icon" class="navigation__icon">
              <font-awesome-icon :icon="item.icon" />
            </div>
            <div class="navigation__label">{{ item.label }}</div>
            <div v-if="item.children" class="navigation__dropdown-arrow">
              <font-awesome-icon icon="chevron-down" />
            </div>
          </div>
          <div
            v-if="item.children && isDropdownOpen(item.id)"
            class="navigation__dropdown-content"
            :class="{
              'navigation__dropdown-content--start': item.alignment === 'start',
              'navigation__dropdown-content--end': item.alignment === 'end',
            }"
          >
            <div
              v-for="child in item.children"
              :key="child.id"
              class="navigation__dropdown-item"
              :class="{
                'navigation__dropdown-item--disabled': child.disabled,
              }"
              @click="(e) => handleItemClick(child, e)"
            >
              <div v-if="showIcons && child.icon" class="navigation__icon">
                <font-awesome-icon :icon="child.icon" />
              </div>
              <div class="navigation__label">{{ child.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="type === 'tabs'">
      <div class="navigation__tabs">
        <div
          v-for="(item, index) in sortedItems"
          :key="item.id"
          class="navigation__tab"
          :class="[
            { 'navigation__tab--active': item.id === activeItem },
            { 'navigation__tab--disabled': item.disabled },
            { 'navigation__tab--right': item.alignment === 'right' },
            { 'navigation__tab--open': isDropdownOpen(item.id) },
          ]"
          :style="{
            '--item-alignment': item.alignment || activeItemAlignment,
            width: item.width || '150px',
            'min-width': item.width || '150px',
            'max-width': item.width || '150px',
            'grid-column': `span ${Math.ceil(parseInt(item.width || '150px') / 150)}`,
          }"
          @click="(e) => handleItemClick(item, e)"
        >
          <div class="navigation__tab-content" @click="(e) => handleItemClick(item, e)">
            <div v-if="showIcons && item.icon" class="navigation__icon">
              <font-awesome-icon :icon="item.icon" />
            </div>
            <div class="navigation__label">{{ item.label }}</div>
            <div v-if="item.children" class="navigation__dropdown-arrow">
              <font-awesome-icon icon="chevron-down" />
            </div>
          </div>
          <div
            v-if="item.children && isDropdownOpen(item.id)"
            class="navigation__dropdown-content"
            :class="{
              'navigation__dropdown-content--start': item.alignment === 'start',
              'navigation__dropdown-content--end': item.alignment === 'end',
            }"
          >
            <div
              v-for="child in item.children"
              :key="child.id"
              class="navigation__dropdown-item"
              :class="{
                'navigation__dropdown-item--disabled': child.disabled,
              }"
              @click="(e) => handleItemClick(child, e)"
            >
              <div v-if="showIcons && child.icon" class="navigation__icon">
                <font-awesome-icon :icon="child.icon" />
              </div>
              <div class="navigation__label">{{ child.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="navigation__dropdowns">
        <div
          v-for="item in items"
          :key="item.id"
          class="navigation__dropdown"
          :class="[
            { 'navigation__dropdown--active': item.id === activeItem },
            { 'navigation__dropdown--disabled': item.disabled },
            { 'navigation__dropdown--start': item.alignment === 'start' },
            { 'navigation__dropdown--end': item.alignment === 'end' },
            { 'navigation__dropdown--open': isDropdownOpen(item.id) },
          ]"
          :style="{
            '--item-alignment': item.alignment || activeItemAlignment,
          }"
        >
          <div class="navigation__dropdown-header" @click="(e) => handleItemClick(item, e)">
            <div v-if="showIcons && item.icon" class="navigation__icon">
              <font-awesome-icon :icon="item.icon" />
            </div>
            <div class="navigation__label">{{ item.label }}</div>
            <div v-if="item.children" class="navigation__dropdown-arrow">
              <font-awesome-icon icon="chevron-down" />
            </div>
          </div>
          <div
            v-if="item.children && isDropdownOpen(item.id)"
            class="navigation__dropdown-content"
            :class="{
              'navigation__dropdown-content--start': item.alignment === 'start',
              'navigation__dropdown-content--end': item.alignment === 'end',
            }"
          >
            <div
              v-for="child in item.children"
              :key="child.id"
              class="navigation__dropdown-item"
              :class="{
                'navigation__dropdown-item--disabled': child.disabled,
              }"
              @click="(e) => handleItemClick(child, e)"
            >
              <div v-if="showIcons && child.icon" class="navigation__icon">
                <font-awesome-icon :icon="child.icon" />
              </div>
              <div class="navigation__label">{{ child.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { NavigationProps, NavigationItem } from '../types/navigation'

const props = defineProps<NavigationProps>()
const emit = defineEmits<{
  (e: 'update:activeItem', value: string): void
  (e: 'item-click', item: NavigationItem): void
}>()

const openDropdownId = ref<string | null>(null)

const sortedItems = computed(() => {
  return [...props.items].sort((a, b) => {
    if (a.alignment === 'right' && b.alignment !== 'right') return 1
    if (a.alignment !== 'right' && b.alignment === 'right') return -1
    return 0
  })
})

const handleItemClick = (item: NavigationItem, event: MouseEvent) => {
  if (item.disabled) return

  // Prevent event propagation to avoid closing the dropdown immediately
  event.stopPropagation()

  emit('item-click', item)
  emit('update:activeItem', item.id)

  if (item.children) {
    openDropdownId.value = openDropdownId.value === item.id ? null : item.id
  } else {
    openDropdownId.value = null
  }
}

const isDropdownOpen = (itemId: string) => {
  return openDropdownId.value === itemId
}

const closeDropdowns = () => {
  openDropdownId.value = null
}

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (
    !target.closest('.navigation__tile') &&
    !target.closest('.navigation__tab') &&
    !target.closest('.navigation__dropdown')
  ) {
    closeDropdowns()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navigation {
  display: flex;
  font-family: Arial, sans-serif;
  width: var(--navigation-width, 100%);
  background-color: var(--navigation-background-color, transparent);
}

.navigation--horizontal {
  flex-direction: row;
}

.navigation--vertical {
  flex-direction: column;
}

/* Tiles */
.navigation__tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--navigation-gap);
  width: 100%;
  height: var(--navigation-height, auto);
}

.navigation__tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--navigation-padding);
  border: 1px solid var(--navigation-color);
  border-radius: var(--navigation-border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  height: 100%;
}

.navigation__tile:hover {
  border-color: var(--navigation-hover-color);
  color: var(--navigation-hover-color);
}

.navigation__tile--active {
  border-color: var(--navigation-active-color);
  color: var(--navigation-active-color);
  background-color: var(--navigation-active-background-color);
}

.navigation__tile--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--navigation-disabled-color);
  border-color: var(--navigation-disabled-color);
}

.navigation__tile--right {
  grid-column: auto;
  margin-left: auto;
}

.navigation__tile-content {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  justify-content: center;
}

/* Tabs */
.navigation__tabs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--navigation-gap);
  border-bottom: 1px solid var(--navigation-color);
  width: 100%;
  height: var(--navigation-height, auto);
}

.navigation__tab {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--navigation-padding);
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  height: 100%;
  border-bottom: 2px solid transparent;
  justify-content: center;
}

.navigation__tab--right {
  grid-column: auto;
  margin-left: auto;
}

.navigation__tab-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
}

.navigation__tab:hover {
  color: var(--navigation-hover-color);
}

.navigation__tab--active {
  color: var(--navigation-active-color);
  background-color: var(--navigation-active-background-color);
}

.navigation__tab--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--navigation-disabled-color);
}

.navigation__tab--open {
  color: var(--navigation-active-color);
}

.navigation__tab--open .navigation__dropdown-arrow {
  transform: rotate(180deg);
}

/* Update dropdown styles for tabs */
.navigation__tab .navigation__dropdown-content {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  min-width: 200px;
  background: white;
  border: 1px solid var(--navigation-color);
  border-radius: 4px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  overflow: hidden;
}

.navigation__tab .navigation__dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.navigation__tab .navigation__dropdown-item:last-child {
  border-bottom: none;
}

.navigation__tab .navigation__dropdown-item:hover {
  background-color: #f8f9fa;
  color: var(--navigation-hover-color);
}

.navigation__tab .navigation__dropdown-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--navigation-disabled-color);
}

/* Dropdowns */
.navigation__dropdowns {
  display: flex;
  flex-direction: column;
  gap: var(--navigation-gap);
  width: 100%;
}

.navigation__dropdown {
  position: relative;
}

.navigation__dropdown--start {
  align-self: flex-start;
}

.navigation__dropdown--end {
  align-self: flex-end;
}

.navigation__dropdown-header {
  display: flex;
  align-items: center;
  padding: var(--navigation-padding);
  cursor: pointer;
  transition: all 0.2s ease;
}

.navigation__dropdown-header:hover {
  color: var(--navigation-hover-color);
}

.navigation__dropdown--active .navigation__dropdown-header {
  color: var(--navigation-active-color);
  background-color: var(--navigation-active-background-color);
}

.navigation__dropdown--disabled .navigation__dropdown-header {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--navigation-disabled-color);
}

.navigation__dropdown-arrow {
  margin-left: 0;
  margin-right: 1rem;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  font-size: 0.8em;
}

.navigation__dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  border: 1px solid var(--navigation-color);
  border-radius: var(--navigation-border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}

.navigation__dropdown-content--end {
  left: auto;
  right: 0;
}

.navigation__dropdown-item {
  display: flex;
  align-items: center;
  padding: var(--navigation-padding);
  cursor: pointer;
  transition: all 0.2s ease;
}

.navigation__dropdown-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--navigation-hover-color);
}

.navigation__dropdown-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--navigation-disabled-color);
}

/* Common styles */
.navigation__icon {
  margin-right: 0.5rem;
  font-size: 1.2em;
}

.navigation__label {
  flex: 1;
  white-space: nowrap;
  text-align: center;
  margin-right: 0.5rem;
}

/* Remove duplicate dropdown styles */
.navigation-dropdown,
.navigation-dropdown__list,
.navigation-dropdown__item,
.navigation-dropdown__link,
.navigation-dropdown__button,
.navigation-item--open {
  display: none;
}

/* Update dropdown styles */
.navigation__tile--open .navigation__dropdown-content,
.navigation__tab--open .navigation__dropdown-content,
.navigation__dropdown--open .navigation__dropdown-content {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  background: white;
  border: 1px solid var(--navigation-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.navigation__tile--right .navigation__dropdown-content {
  left: auto;
  right: 0;
}

/* Specific border radius for tab navigation dropdown */
.navigation__tab--open .navigation__dropdown-content {
  border-radius: var(--navigation-border-radius);
  min-width: 200px;
  right: auto;
}

.navigation__tile--open .navigation__dropdown-content,
.navigation__dropdown--open .navigation__dropdown-content {
  border-radius: var(--navigation-border-radius);
}

.navigation__tile .navigation__dropdown-item {
  min-height: 3rem;
  display: flex;
  align-items: center;
  padding: var(--navigation-padding);
  cursor: pointer;
  transition: all 0.2s ease;
}

.navigation__tile .navigation__dropdown-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--navigation-hover-color);
}

.navigation__tile .navigation__dropdown-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--navigation-disabled-color);
}

/* Update content layouts */
.navigation__tile-content,
.navigation__tab-content,
.navigation__dropdown-header {
  display: flex;
  align-items: center;
  width: 100%;
}

.navigation__tile-content {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  justify-content: center;
}

.navigation__tab-content,
.navigation__dropdown-header {
  flex-direction: row;
}
</style>
