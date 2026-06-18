<template>
  <AdminCard title="PDF Download Config">
    <div class="text-xs text-muted mb-4">Select which PDF visitors will download when clicking "Download CV"</div>

    <!-- PDF list -->
    <div v-for="file in data.files" :key="file.id" class="flex items-center gap-3 mb-3 p-3 bg-bg-tertiary rounded-lg">
      <input
        type="radio"
        :value="file.id"
        v-model="activeId"
        class="accent-spring"
      />
      <div class="flex-1">
        <div class="text-sm text-text-primary">{{ file.label }}</div>
        <div class="text-xs text-muted font-mono">{{ file.filename }}</div>
      </div>
      <a
        :href="`/cv/${file.filename}`"
        target="_blank"
        class="text-xs text-cyan hover:underline"
      >Preview</a>
      <button
        v-if="file.id !== activeId"
        class="text-xs text-red-400 hover:text-red-300"
        @click="deleteFile(file.id)"
      >Delete</button>
      <span v-else class="text-xs text-muted">Active</span>
    </div>

    <!-- Upload new PDF -->
    <div class="mt-4 p-4 border border-dashed border-border rounded-lg">
      <div class="text-xs text-muted uppercase tracking-wider mb-3">Upload New PDF</div>
      <div class="flex flex-col gap-2">
        <input
          v-model="uploadLabel"
          class="admin-input"
          placeholder="Label (e.g. Backend Engineer CV 2026)"
        />
        <div class="flex gap-2 items-center">
          <input
            ref="fileInput"
            type="file"
            accept=".pdf"
            class="text-sm text-muted file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-bg-tertiary file:text-text-primary hover:file:bg-border file:cursor-pointer file:transition-colors"
            @change="onFileChange"
          />
        </div>
        <button
          :disabled="!selectedFile || uploading"
          class="self-start px-5 py-2 rounded-md text-sm font-semibold bg-cyan text-bg hover:bg-cyan/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          @click="upload"
        >
          {{ uploading ? 'Uploading...' : 'Upload' }}
        </button>
        <p v-if="uploadMsg" class="text-xs" :class="uploadError ? 'text-red-400' : 'text-spring'">{{ uploadMsg }}</p>
      </div>
    </div>

    <template #actions>
      <AdminSaveBtn @click="$emit('save', { ...data, activeId })" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { PdfConfig } from '~/types/cv'

const props = defineProps<{ data: PdfConfig }>()
const emit = defineEmits<{ save: [data: PdfConfig]; reload: [] }>()

const activeId = ref(props.data.activeId)
watch(() => props.data.activeId, (v) => { activeId.value = v })

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const uploadLabel = ref('')
const uploading = ref(false)
const uploadMsg = ref('')
const uploadError = ref(false)

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  selectedFile.value = input.files?.[0] || null
}

async function upload() {
  if (!selectedFile.value) return
  uploading.value = true
  uploadMsg.value = ''
  uploadError.value = false

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('label', uploadLabel.value || selectedFile.value.name.replace('.pdf', ''))

  try {
    await $fetch('/api/pdf/upload', { method: 'POST', body: formData })
    uploadMsg.value = 'Upload successful!'
    selectedFile.value = null
    uploadLabel.value = ''
    if (fileInput.value) fileInput.value.value = ''
    emit('reload')
  } catch (e: any) {
    uploadError.value = true
    uploadMsg.value = e?.data?.message || 'Upload failed'
  } finally {
    uploading.value = false
  }
}

async function deleteFile(id: string) {
  if (!confirm(`Delete this PDF?`)) return
  try {
    await $fetch(`/api/pdf/${id}`, { method: 'DELETE' })
    emit('reload')
  } catch (e: any) {
    alert(e?.data?.message || 'Delete failed')
  }
}
</script>
