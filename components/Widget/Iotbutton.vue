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
    
     <base-button @click="sendValue()" type="blue" class="mb-3" size="lg">Add</base-button>
    
  </card>
</template>

<script>
export default {
  //props:['config'],
  
  data() {
    return {
      sending:false,
      config: {
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
        class: "success",
        message:"{'fanstatus':'stop'}"
      }
    };
  },
  mounted() {
   
  },
  methods: {
   
    sendValue(){
        this.sending =true;
        setTimeout(()=>{
            this.sending =false;
        },500)
    
        const toSend ={
            topic: this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/actdata",
            msg: {
                value: this.config.message
            }    
        }
        console.log(toSend)
        this.$nuxt.$emit('mqtt-sender', toSend);
    },

    getIconColorClass() {
      if (!this.sending) {
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
