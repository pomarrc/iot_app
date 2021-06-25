<template>
  <card>
    <div slot="header">
      <h4 class="card-title">
        {{ config.selectedDevice.name }}-{{ config.variableFullName }}
      </h4>
    </div>
    <i                       
      class="fa "           
      :class="[config.icon, getIconColorClass()]"
      style="font-size:30px"
    ></i>
  </card>
</template>

<script>
export default {
  props:['config'],
  
  data() {
    return {
      value: false
     /* config: {
        userId: "userid",
        selectedDevice: {
          name: "Office",
          dId: "3458",
          templateName: "Power Camera",
          templateId: "232gdfgdfgiy232334sdd",
          saverRule: true
        },
        variableFullName: "Pump",
        variable: "uniquestr",
        icon: "fa-sun",
        column: "col-6",
        widget: "indicator",
        class: "success"
      }*/
    };
  },
  mounted() {
    //userId/dId/uniquestr/sdata
    const topic = this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata";
    console.log(topic);
    this.$nuxt.$on(topic, this.processReceivedData)
  },
  methods: {
    processReceivedData(data) {
      console.log("received");
      console.log(data);
      this.value = data.value;
    },

    getIconColorClass() {
      if (!this.value) {
        return "text-dark";
      }
      if (this.config.class == "success") {
        return "text-success";
      }
      if (this.config.class == "primary") {
        return "text-primary";
      }
      if (this.config.class == "warning") {
        return "text-warning";
      }
      if (this.config.class == "danger") {
        return "text-danger";
      }
    }
  }
};
</script>
