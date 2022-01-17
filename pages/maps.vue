<template>
  <div>
    <GmapMap
      style="width: 500px; height: 300px"
      :center="{ lat: 10, lng: 10 }"
      :zoom="1"
      ref="map"
    >
    </GmapMap>
  </div>
</template>
<script>
export default {
  middleware: "authenticated"
};
</script>
