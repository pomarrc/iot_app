<template>
  <div class="row">
   
   <iotbutton :config="configButton"></iotbutton>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
       
      configButton: {
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
        class: "blue",//success> verde, primary >morado, blue>azul
        message:"{'fanstatus':'stop'}"
      },

      configIndicator: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888",
          templateName: "Power Sensor",
          templateId: "984237562348756ldksjfh",
          saverRule: false
        },
        variableFullName: "Pump",
        variable: "var1",
        icon: "fa-sun",
        column: "col-6",
        widget: "indicator",
        class: "success"
      },


    };
  },
  methods: {

  }
};
</script>
