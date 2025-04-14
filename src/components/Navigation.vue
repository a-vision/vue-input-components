<template>
  <nav
    :class="[
      'navigation',
      `navigation--${type}`,
      `navigation--${orientation}`,
      { 'navigation--large-icons': iconSize === 'large' },
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
      '--navigation-bottom-border': showBottomBorder
        ? `1px solid ${bottomBorderColor || 'rgba(0, 0, 0, 0.2)'}`
        : 'none',
      '--navigation-tiles-grid': navigationGrid,
      'max-height': height,
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
            { 'navigation__tile--spacer': item.id.includes('spacer') },
          ]"
          :style="{
            '--item-alignment': item.alignment || activeItemAlignment,
            width: item.width || '150px',
            'min-width': item.width || '150px',
            'max-width': item.width || '150px',
            'grid-column': item.alignment === 'right' ? `${index - items.length}` : `auto`,
          }"
          @click="(e) => !item.id.includes('spacer') && handleItemClick(item, e)"
        >
          <div
            class="navigation__tile-content"
            :class="{
              'navigation__tile-content--icon-only': !item.label,
              'navigation__tile-content--large-icon': iconSize === 'large' && item.icon,
            }"
          >
            <div v-if="item.icon" class="navigation__icon">
              <img
                v-if="item.icon.startsWith('img:')"
                :src="item.icon.substring(4)"
                :alt="item.label || 'Icon'"
                class="navigation__icon-image"
              />
              <font-awesome-icon v-else :icon="item.icon" />
            </div>
            <div v-if="item.label" class="navigation__label">
              <span>{{ item.label }}</span>
              <div v-if="item.children" class="navigation__dropdown-arrow">
                <font-awesome-icon icon="chevron-down" />
              </div>
            </div>
          </div>
          <div
            v-if="item.url && parseInt(height || '0') >= 80 && !item.hideExternalOpen"
            class="navigation__external-link"
            @click.stop="openUrl(item.url)"
          >
            <font-awesome-icon icon="square-up-right" />
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
              <div v-if="child.icon" class="navigation__icon">
                <img
                  v-if="child.icon.startsWith('img:')"
                  :src="child.icon.substring(4)"
                  :alt="child.label || 'Icon'"
                  class="navigation__icon-image"
                />
                <font-awesome-icon v-else :icon="child.icon" />
              </div>
              <div v-if="child.label" class="navigation__label">{{ child.label }}</div>
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
          <div
            class="navigation__dropdown-header"
            :class="{
              'navigation__dropdown-header--icon-only': !item.label,
              'navigation__dropdown-header--large-icon': iconSize === 'large' && item.icon,
            }"
            @click="(e) => handleItemClick(item, e)"
          >
            <div v-if="item.icon" class="navigation__icon">
              <img
                v-if="item.icon.startsWith('img:')"
                :src="item.icon.substring(4)"
                :alt="item.label || 'Icon'"
                class="navigation__icon-image"
              />
              <font-awesome-icon v-else :icon="item.icon" />
            </div>
            <div v-if="item.label" class="navigation__label">
              <span>{{ item.label }}</span>
              <div v-if="item.children" class="navigation__dropdown-arrow">
                <font-awesome-icon icon="chevron-down" />
              </div>
            </div>
          </div>
          <div
            v-if="item.url && parseInt(height || '0') >= 80 && !item.hideExternalOpen"
            class="navigation__external-link"
            @click.stop="openUrl(item.url)"
          >
            <font-awesome-icon icon="square-up-right" />
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
              <div v-if="child.icon" class="navigation__icon">
                <img
                  v-if="child.icon.startsWith('img:')"
                  :src="child.icon.substring(4)"
                  :alt="child.label || 'Icon'"
                  class="navigation__icon-image"
                />
                <font-awesome-icon v-else :icon="child.icon" />
              </div>
              <div v-if="child.label" class="navigation__label">{{ child.label }}</div>
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

const navigationGrid = computed(() => {
  return sortedItems.value.map((item) => item.width || '150px').join(' ')
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

const openUrl = (url: string) => {
  window.open(url, '_blank')
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
  if (!target.closest('.navigation__tile') && !target.closest('.navigation__dropdown')) {
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
  grid-template-columns: var(--navigation-tiles-grid);
  gap: var(--navigation-gap);
  width: 100%;
  height: var(--navigation-height, auto);
  border-bottom: var(--navigation-bottom-border);
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

  .navigation__tile-content {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1.05);
  }
}

.navigation__tile--active {
  border-color: var(--navigation-active-color);
  color: var(--navigation-active-color);
  background-color: var(--navigation-active-background-color);
  box-shadow:
    -5px 0 3px -3px rgba(0, 0, 0, 0.1),
    5px 0 3px -3px rgba(0, 0, 0, 0.1);
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
  flex-direction: row;
  justify-content: flex-start;
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
  margin-left: 0.5rem;
  margin-right: 0;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  font-size: 0.8em;
}

.navigation--large-icons .navigation__dropdown-arrow {
  margin-left: 0.5rem;
  margin-right: 0;
  margin-bottom: 0;
}

.navigation__dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 150px;
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
  justify-content: center;
}

.navigation__dropdown-item .navigation__label {
  text-align: center;
  justify-content: center;
}

.navigation__dropdown-item .navigation__icon {
  margin-left: 0;
  margin-right: 1rem;
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
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation__icon-image {
  width: 1.2em;
  height: 1.2em;
  object-fit: contain;
}

.navigation--large-icons .navigation__icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0;
  margin-right: 0;
}

.navigation--large-icons .navigation__icon-image {
  width: 2.5rem;
  height: 2.5rem;
}

.navigation--large-icons .navigation__tile-content,
.navigation--large-icons .navigation__dropdown-header {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.navigation--large-icons .navigation__label {
  text-align: center;
}

/* Icon-only styles */
.navigation__tile-content--icon-only,
.navigation__dropdown-header--icon-only {
  justify-content: center;
}

.navigation__tile-content--icon-only .navigation__icon,
.navigation__dropdown-header--icon-only .navigation__icon {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
}

/* Update content layouts */
.navigation__tile-content,
.navigation__dropdown-header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
}

.navigation__tile-content {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  justify-content: center;
}

.navigation__dropdown-header {
  flex-direction: row;
  justify-content: flex-start;
}

.navigation__tile--spacer {
  cursor: default;
  pointer-events: none;
  border-color: transparent;
  background: transparent;
}

.navigation__tile--spacer:hover {
  border-color: transparent;
  color: inherit;
  background: transparent;
}

.navigation__label {
  white-space: nowrap;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation__label span {
  flex: 1;
  text-align: center;
}

.navigation__dropdown-item .navigation__label {
  text-align: center;
  justify-content: center;
}

.navigation__dropdown-item .navigation__icon {
  margin-left: 0;
  margin-right: 1rem;
}

.navigation__tile--open .navigation__dropdown-arrow,
.navigation__dropdown--open .navigation__dropdown-arrow {
  transform: rotate(180deg);
}

/* Update dropdown styles */
.navigation__tile--open .navigation__dropdown-content,
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

.navigation__external-link {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.6em;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.navigation__external-link:hover {
  color: rgba(0, 0, 0, 0.9);
}

.navigation__tile:hover .navigation__external-link {
  color: rgba(0, 0, 0, 0.3);
}
</style>
