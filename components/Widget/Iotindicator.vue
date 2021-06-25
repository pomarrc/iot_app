<template>
    <card>
        <div slot="header">
          <h4 class="card-title">{{config.selectedDevice.name}}-{{config.variableFullName}}</h4>
        </div>
        <i class="fa " :class="[config.icon]" ></i>
    </card>   
    
</template>

<script>
export default {
    //props:['config'],
    data(){
        return{
            config:{
                userId: 'userid',
                selectedDevice:{
                     name: "Office",
                     dId: "3458",
                     templateName: "Power Camera",
                     templateId: "232gdfgdfgiy232334sdd",
                     saverRule: true
                    
                },
                variableFullName:"Pump",
                variable: "uniquestr",
                icon: "fa-sun",
                column: 'col-6',
                widget: 'indicator',
                class: 'danger'

            }
        }
    }
}
</script>


