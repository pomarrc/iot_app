<template>
    <h2>
        
    </h2>
</template>

<script>

export default {
     middleware: 'authenticated',
    mounted() {
        $nuxt.$router.push("/dashboard")
    },
}
</script>
