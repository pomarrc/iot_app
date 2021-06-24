<template>
  <div>
    <!-- FROM AND DEVICE-->
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
            <slot>
              <label>Template</label>
            </slot>
            <el-select
              value="1"
              placeholder="Select Template"
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
            <base-button type="primary" class="mb-3" size="lg">Add</base-button>
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
            <div slot-scope="{row}">
              
            <el-tooltip
              content="Delete"
              effect="light"
              :open-delay="300"
              placement="top"
            >
              <el-button type="danger" icon size="sm" class="btn-link" @click="deleteDevice(row)">
                <i class="tim-icons icon-simple-remove"></i>
              </el-button>
            </el-tooltip>

            </div>
           

          </el-table-column>

        </el-table>
      </card>
    </div>
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
          templateId: "232gdfdd232334sdd"
        },
        {
          name: "Office",
          dId: "3458",
          templateName: "Power Camera",
          templateId: "232gdfgdfgiy232334sdd"
        },
        {
          name: "Farm",
          dId: "8288",
          templateName: "Temperature",
          templateId: "2323dgdgdfgsdd"
        }
      ]
    };
  },
  methods:{
      deleteDevice(device){
          alert("DELETING " + device.name)
      }
  }
};
</script>
