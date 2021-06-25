<template>
  <div>
    <!-- FROM ADD DEVICE-->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Add new Device</h4>
        </div>

        <div class="row">
          <div class="col-4">
            <base-input
              label="Device Name"
              type="text"
              placeholder="Ex:Home, Office..."
            ></base-input>
          </div>
          <div class="col-4">
            <base-input
              label="Device Id"
              type="text"
              placeholder="Ex:777, 999..."
            ></base-input>
          </div>

          <div class="col-4">
            <slot name="label">
              <label>Template</label>
            </slot>

            <el-select
              value="1"
              placeholder="Select Template"
              class="select-primary"
              style="width:100%"
            >
              <el-option
                class="text-dark"
                value="Template 1"
                label="Template 1"
              ></el-option>

              <el-option
                class="text-dark"
                value="Template 2"
                label="Template 2"
              ></el-option>

              <el-option
                class="text-dark"
                value="Template 3"
                label="Template 3"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="row pull-right">
          <div class="col-12">
            <base-button type="blue" class="mb-3" size="lg">Add</base-button>
          </div>
        </div>
      </card>
    </div>
    <!-- DEVICE TABLE -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Devices</h4>
        </div>
        <el-table :data="devices">

          <el-table-column  label="#" min-width="50" align="center">
             <div slot-scope= "{ $index }">
               {{$index + 1 }}
             </div>

          </el-table-column>
         
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="dId" label="Device Id"></el-table-column>
          <el-table-column
            prop="templateName"
            label="Template"
          ></el-table-column>

          <el-table-column label="Action">
            <div slot-scope="{row, $index}">
               
              <el-tooltip content="Database Saver" >
                  
                  <base-switch @click="updateSaverRuleStatus($index)" :value="row.saverRule" type="blue" on-text="On" off-text="Off"></base-switch>
              </el-tooltip>
            
            <el-tooltip
              content="Delete"
              effect="light"
              :open-delay="300"
              placement="top"
            >
              <base-button 
              type="danger" 
              icon 
              size="sm"
              class="btn-link"
              @click="deleteDevice(row)"
              >
               <i class="tim-icons icon-simple-remove"></i>
              </base-button>
            </el-tooltip>

            </div>
           

          </el-table-column>

        </el-table>
      </card>
    </div>
  <json :value="devices">
      {{devices}}
  </json>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select
  },
  data() {
    return {
      devices: [
        {
          name: "Home",
          dId: "8888",
          templateName: "Power Sensor",
          templateId: "232gdfdd232334sdd",
          saverRule: false,
          cont:500
        },
        {
          name: "Office",
          dId: "3458",
          templateName: "Power Camera",
          templateId: "232gdfgdfgiy232334sdd",
          saverRule: true
        },
        {
          name: "Farm",
          dId: "8288",
          templateName: "Temperature",
          templateId: "2323dgdgdfgsdd",
          saverRule: false
        }
      ]
    };
  },

  methods:{
      deleteDevice(device){
          alert("DELETING " + device.name)
      },
      updateSaverRuleStatus(index){
          this.devices[index].saverRule = !this.devices[index].saverRule
      }
  }
};
</script>
