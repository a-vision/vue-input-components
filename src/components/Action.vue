<template>
  <component
    :is="isLink ? 'a' : 'button'"
    :href="isLink ? href : undefined"
    :type="isLink ? undefined : type"
    :class="[
      'action',
      {
        'action--icon-only': icon && !label,
        'action--label-only': !icon && label,
        'action--icon-label': icon && label,
        'action--disabled': disabled,
        'action--link': isLink,
        'action--small': size === 'small',
        'action--large': size === 'large',
      },
    ]"
    :style="{
      backgroundColor: isLink ? 'transparent' : color,
      color: isLink ? color : 'rgba(255, 255, 255, 0.8)',
      borderColor: isLink ? 'transparent' : color,
    }"
    :disabled="disabled"
    @click="handleClick"
  >
    <font-awesome-icon v-if="icon" :icon="icon" class="action__icon" />
    <span v-if="label" class="action__label">{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ActionProps {
  icon?: string
  label?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  color?: string
  size?: 'small' | 'regular' | 'large'
}

const props = withDefaults(defineProps<ActionProps>(), {
  icon: undefined,
  label: undefined,
  href: undefined,
  type: 'button',
  disabled: false,
  color: 'var(--primary)',
  size: 'regular',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isLink = computed(() => !!props.href)

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

/* Size variants */
.action--small {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  gap: 0.25rem;
  min-height: 1.5rem;
}

.action--small.action--icon-only {
  padding: 0.375rem;
  min-width: 1.5rem;
}

.action--small .action__icon {
  font-size: 0.9rem;
  width: 0.9rem;
  height: 0.9rem;
}

.action--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  gap: 0.625rem;
  min-height: 2.5rem;
}

.action--large.action--icon-only {
  padding: 1rem;
  min-width: 2.5rem;
}

.action--large .action__icon {
  font-size: 1.35rem;
  width: 1.35rem;
  height: 1.35rem;
}

.action:hover:not(.action--disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action:active:not(.action--disabled) {
  transform: translateY(0);
  box-shadow: none;
}

.action--icon-only {
  padding: 0.75rem;
  border-radius: 50%;
  aspect-ratio: 1;
}

.action--label-only {
  padding: 0.5rem 1rem;
}

.action--icon-label {
  padding: 0.5rem 1rem;
}

.action--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action--link {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  transform: none !important;
}

.action--link:hover:not(.action--disabled) {
  opacity: 0.8;
  transform: none;
  box-shadow: none;
}

.action--link .action__label {
  text-decoration: underline;
}

.action__icon {
  font-size: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action__label {
  white-space: nowrap;
}
</style>
