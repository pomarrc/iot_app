<template>
  <card>
    <template slot="header">
      <h5 class="card-category" style="font-size: 20px">
        {{ config.selectedDevice.name }} - {{ config.variableFullName }}
      </h5>
      <h3 class="card-title"></h3>
      <GmapMap
        style="width: 100%; height: 350px"
        :center="position"
        :zoom="15"
        ref="map"
      >
        <GmapMarker :position="position" :clickable="true" :draggable="true">
        </GmapMarker>
      </GmapMap>
    </template>
  </card>
</template>

<script>
export default {
  name: "mapa",
  props: ["config"],
  data() {
    return {
      position: { lat: 19.664963, lng: -99.116039 }
    };
  },
  mounted() {
    const topic =
      this.config.userId +
      "/" +
      this.config.selectedDevice.dId +
      "/" +
      this.config.variable +
      "/sdata";
    console.log(topic);
    this.$nuxt.$on(topic, this.processReceivedData);
  },
  beforeDestroy() {
    this.$nuxt.$off(
      this.config.userId +
        "/" +
        this.config.selectedDevice.dId +
        "/" +
        this.config.variable +
        "/sdata"
    );
  },
  methods: {
    processReceivedData(data) {
      console.log("Recibiendo coordenadas");
      console.log(data);
      this.position = data;
    }
  }
};
</script>
