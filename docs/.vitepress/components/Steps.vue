<script setup>
import {ref} from "vue";

const prop = defineProps({
    images: {type: Array, default: []},
    titles: {type: Array, default: []},
})
const idx = ref(0)
</script>

<template>
    <v-carousel
        :continuous="false"
        :show-arrows="false"
        mandatory
        v-model="idx"
    >
        <v-carousel-item
            v-for="(image, i) in images"
            :key="i"
            :src="image"
            transition="v-fab-transition"
        >
        </v-carousel-item>
    </v-carousel>

    <div class="d-flex flex-column">
        <div v-for="(title, i) in titles" :key="i" :class="i===idx?'text-yellow':''" class="my-1">
            {{title}}
        </div>
    </div>
</template>


<style scoped>

</style>