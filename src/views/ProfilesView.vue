<template>
  <section class="space-y-6">
    <h1 class="text-2xl font-bold">Profiles</h1>
    <p class="text-gray-600">List of public profiles (dummy for now). Later: search, pagination, detail page.</p>

    <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <li v-for="i in 6" :key="i" class="border rounded-xl p-4">
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 rounded-full bg-gray-200" />
          <div>
            <p class="font-semibold">User {{ i }}</p>
            <p class="text-gray-500 text-sm">Short bio…</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>


