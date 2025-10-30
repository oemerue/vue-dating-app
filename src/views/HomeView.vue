<template>
  <section class="space-y-6">
    <div class="text-center py-12">
      <h1 class="text-4xl font-extrabold mb-4">
        <span class="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to VueDating 💕
        </span>
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Here you’ll show some info about the platform and maybe public profiles or a hero section. 
      </p>
      
      <div class="flex gap-4 justify-center">
        <RouterLink 
          to="/register"
          class="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 shadow-lg"
        >
          Get Started
        </RouterLink>
        <RouterLink 
          to="/profiles"
          class="px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-lg font-medium hover:bg-pink-50"
        >
          Browse Profiles
        </RouterLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="grid md:grid-cols-2 gap-6 mt-12">
      <div class="text-center p-6">
        <div class="text-4xl mb-4">🔒</div>
        <h3 class="text-xl font-bold mb-2">Safe & Secure</h3>
        <p class="text-gray-600">Your privacy and security are our top priority</p>
      </div>
      <div class="text-center p-6">
        <div class="text-4xl mb-4">💬</div>
        <h3 class="text-xl font-bold mb-2">Easy Chat</h3>
        <p class="text-gray-600">Start meaningful conversations instantly</p>
      </div>
    </div>
  </section>
</template>
