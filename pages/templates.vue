<template>
  <div>
    <!-- WIDGET CONFIGURATOR -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Widget</h4>
        </div>
        <div class="row">
          <!-- WIDGET SELECTOR AND FORMS -->
          <div class="col-6">
            <!-- WIDGET SELECTOR -->
            <el-select
              v-model="widgetType"
              class="select-success"
              placeholder="Select widget"
              style="width: 100%"
            >
              <el-option
                class="text-dark"
                value="numberchart"
                label="Number Chart INPUT <-"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="indicator"
                label="Boolean Indicator INPUT <-"
              >
              </el-option>
              <el-option class="text-dark" value="map" label="Map INPUT <-">
              </el-option>
              <el-option
                class="text-dark"
                value="switch"
                label="Swith OUTPUT <-"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="button"
                label="Button OUTPUT <-"
              >
              </el-option>
            </el-select>
            <br />
            <br />

            <!-- FORM NUMBER CHART TYPE -->
            <div v-if="widgetType == 'numberchart'">
              <!-- var name -->
              <base-input
                v-model="configNumberChart.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>
              <!-- unit -->
              <base-input v-model="configNumberChart.unit" label="Unit" type="text">
              </base-input>
              <!-- decimal places -->
              <base-input
                v-model="configNumberChart.decimalPlaces"
                label="Decimal Places"
                type="number"
              >
              </base-input>
              <!-- var icon -->
              <base-input v-model="configNumberChart.icon" label="Icon" type="text">
              </base-input>
              <br />
              <!-- Chart Back Time -->
              <base-input
                v-model="configNumberChart.chartTimeAgo"
                label="Char Back Time (mins)"
                type="number"
              >
              </base-input>
              <br />
              <!-- select success -->
              <el-select
                v-model="configNumberChart.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-success"
                  value="primari"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-success"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-success"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>
              <br /><br /><br />
              <!-- select width column -->
              <el-select
                v-model="configNumberChart.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="col-3"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-4"
                  label="col-4"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-5"
                  label="col-5"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="col-6"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-7"
                  label="col-7"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-8"
                  label="col-8"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-9"
                  label="col-9"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-10"
                  label="col-10"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-11"
                  label="col-11"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="col-12"
                ></el-option>
              </el-select>
              <br /><br /><br />
            </div>

            <!-- FORM  SWITCH TYPE -->
            <div v-if="widgetType == 'switch'">
              <!--var name-->
              <base-input
                v-model="configSwitch.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>
              <!--icon-->
              <base-input
                v-model="configSwitch.icon"
                label="Icon"
                type="text"
              ></base-input>
              <br />
              <!--select success-->
              <el-select
                v-model="configSwitch.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>
              <br /><br /><br />
              <!--select width colum-->
              <el-select
                v-model="configSwitch.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="col-3"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-4"
                  label="col-4"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-5"
                  label="col-5"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="col-6"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-7"
                  label="col-7"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-8"
                  label="col-8"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-9"
                  label="col-9"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-10"
                  label="col-10"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-11"
                  label="col-11"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="col-12"
                ></el-option>
              </el-select>
              <br /><br />
            </div>

            <!-- FORM BUTTON TYPE -->
            <div v-if="widgetType == 'button'">
              <!--var name -->
              <base-input
                v-model="configButton.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>
              <!--massage to send -->
              <base-input
                v-model="configButton.message"
                label="Message to send"
                type="text"
              >
              </base-input>
              <!--button text -->
              <base-input
                v-model="configButton.text"
                label="Button Text"
                type="text"
              >
              </base-input>
              <!--icon -->
              <base-input
                v-model="configButton.icon"
                label="Icon"
                type="text"
              ></base-input>
              <br />
              <!--select success -->
              <el-select
                v-model="configButton.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>
              <br /><br /><br />
              <!--select width colum -->
              <el-select
                v-model="configButton.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="col-3"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-4"
                  label="col-4"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-5"
                  label="col-5"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="col-6"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-7"
                  label="col-7"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-8"
                  label="col-8"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-9"
                  label="col-9"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-10"
                  label="col-10"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-11"
                  label="col-11"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="col-12"
                ></el-option>
              </el-select>

              <br /><br />
            </div>

            <!-- FORM INDICATOR TYPE -->
            <div v-if="widgetType == 'indicator'">
              <!--var name -->
              <base-input
                v-model="iotIndicatorConfig.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>
              <!--icon -->
              <base-input
                v-model="iotIndicatorConfig.icon"
                label="Icon"
                type="text"
              ></base-input>
              <br />
              <!--select success -->
              <el-select
                v-model="iotIndicatorConfig.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
              </el-select>
              <br /><br /><br />
              <!--select width column -->
              <el-select
                v-model="iotIndicatorConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="col-3"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-4"
                  label="col-4"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-5"
                  label="col-5"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="col-6"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-7"
                  label="col-7"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-8"
                  label="col-8"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-9"
                  label="col-9"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-10"
                  label="col-10"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-11"
                  label="col-11"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="col-12"
                ></el-option>
              </el-select>
              <br /><br />
            </div>
          </div>

          <!-- WIDGET PREVIEW -->
          <div class="col-6">
            <Rtnumberchart
              v-if="widgetType == 'numberchart'"
              :config="configNumberChart"
            ></Rtnumberchart>
            <Iotswitch
              v-if="widgetType == 'switch'"
              :config="configSwitch"
            ></Iotswitch>
            <Iotbutton
              v-if="widgetType == 'button'"
              :config="configButton"
            ></Iotbutton>
            <Iotindicator
              v-if="widgetType == 'indicator'"
              :config="iotIndicatorConfig"
            ></Iotindicator>
          </div>
        </div>
        <!-- ADD WIDGET BUTTON -->
        <div class="row pull-right">
          <div class="col-12">
            <base-button
              native-type="submit"
              type="blue"
              class="mb-3"
              size="lg"
              @click="addNewWidget()"
            >
              Add Widget
            </base-button>
          </div>
        </div>
      </card>
    </div>
    <!-- DASHBOARD PREVIEW -->
    <div class="row">
      <div v-for="(widget, index) of widgets" :key="index" :class="[widget.column]">
        <i
          aria-hidden="true"
          class="fa fa-trash text-warning pull-right"
          @click="deleteWidget(index)"
          style="margin-bottom: 10px;"
        ></i>

        <rtnumberchart
          v-if="widget.widget == 'numberchart'"
          :config="widget"
        ></rtnumberchart>
        <iotswitch
          v-if="widget.widget == 'switch'"
          :config="widget"
        ></iotswitch>
        <iotbutton
          v-if="widget.widget == 'button'"
          :config="widget"
        ></iotbutton>
        <iotindicator
          v-if="widget.widget == 'indicator'"
          :config="widget"
        ></iotindicator>
      </div>
    </div>

    <!-- SAVE TEMPLATE-->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Save Template</h4>
        </div>

        <div class="row">
          <base-input
            class="col-4"
            v-model="templateName"
            label="Template Name"
            type="text"
          >
          </base-input>

          <base-input
            class="col-8"
            v-model="templateDescription"
            label="Template Description"
            type="text"
          >
          </base-input>
        </div>

        <br /><br />

        <div class="row">
          <div class="col-12">
            <base-button
              native-type="submit"
              type="primary"
              class="mb-3 pull-right"
              size="lg"
              @click="saveTemplate()"
              :disabled="widgets.length == 0"
            >
              Save Template
            </base-button>
          </div>
        </div>
      </card>
    </div>

    <!-- TEMPLATES TABLE -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Templates</h4>
        </div>

        <div class="row">
          <el-table :data="templates">
            
            <el-table-column min-width="50" label="#" align="center">
              <div class="photo" slot-scope="{ row, $index }">
                {{ $index + 1 }}
              </div>
            </el-table-column>

            <el-table-column prop="name" label="Name"></el-table-column>

            <el-table-column
              prop="description"
              label="Description"
            ></el-table-column>

            <el-table-column
              prop="widgets.length"
              label="Widgets"
            ></el-table-column>

            <el-table-column header-align="right" align="right" label="Actions">
              <div
                slot-scope="{ row, $index }"
                class="text-right table-actions"
              >
                <el-tooltip
                  content="Delete"
                  effect="light"
                  :open-delay="300"
                  placement="top"
                >
                  <base-button
                    @click="deleteTemplate(row)"
                    type="danger"
                    icon
                    size="sm"
                    class="btn-link"
                  >
                    <i class="tim-icons icon-simple-remove "></i>
                  </base-button>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </card>
    </div>
    <!-- JSONS -->
    <Json :value="widgets"></Json>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";
import Rtnumberchart from '../components/Widget/Rtnumberchart.vue';
import Iotswitch from '../components/Widget/Iotswitch.vue';
import Iotbutton from '../components/Widget/Iotbutton.vue';
import Iotindicator from '../components/Widget/Iotindicator.vue';

export default {
   middleware: 'authenticated',
  components: {
    Rtnumberchart,
    Iotswitch,
    Iotbutton,
    Iotindicator,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select
  },
  data() {
    return {
      widgets: [],
      templates: [],
      widgetType: "",
      templateName: "",
      templateDescription: "",
      configNumberChart: {
        userId: "sampleuserid",
        selectedDevice: {
          name: "Home",
          dId: "8888"
        },
        variableFullName: "temperature",
        variable: "varname",
        unit: "Watts",
        class: "success",
        column: "col-12",
        decimalPlaces: 2,
        widget: "numberchart",
        icon: "fa-bath",
        chartTimeAgo: 1566,
        demo: true
      },
      configSwitch: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888"
        },
        variableFullName: "Luz",
        variable: "varname",
        class: "danger",
        widget: "switch",
        icon: "fa-bath",
        column: "col-6"
      },
      configButton: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888"
        },
        variableFullName: "temperature",
        text: "send",
        message: "testing123",
        variable: "varname",
        widget: "button",
        icon: "fa-bath",
        column: "col-6"
      },
      iotIndicatorConfig: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888"
        },
        variableFullName: "temperature",
        variable: "varname",
        class: "success",
        widget: "indicator",
        icon: "fa-bath",
        column: "col-6"
      },
      configButton: {
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
        class: "danger",
        message: "{'fanstatus': 'stop'}"
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
      }
    };
  },
  mounted(){
    this.getTemplates();
  },
  methods: {
    //get template   
    async getTemplates() {

      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      try {
        const res = await this.$axios.get("/template", axiosHeaders);
        console.log(res.data);

        if (res.data.status == "success") {
          this.templates = res.data.data;
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates..."
        });
        console.log(error);
        return;
      }
    },
    //save template
    async saveTemplate() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      console.log(axiosHeaders)

      const toSend = {
        template: {
          name: this.templateName,
          description: this.templateDescription,
          widgets: this.widgets
        }
      };
      

      try {

        const res = await this.$axios.post("/template", toSend, axiosHeaders);

        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-alert-circle-exc",
            message: "Template created!"
          });
          this.getTemplates();
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error creating template..."
        });
        console.log(error);
        return;
      }
    },
     //Delete Template
    async deleteTemplate(template) {

      
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        },
        params:{
          templateId:template._id
        }
      };

      console.log(axiosHeaders);

      try {

        const res = await this.$axios.delete("/template", axiosHeaders);

        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-alert-circle-exc",
            message: template.name + " was deleted!"
          });
          
          this.getTemplates();
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates..."
        });
        console.log(error);
        return;
      }
    },
    //add widget
   addNewWidget(){
       if (this.widgetType == "numberchart"){
           this.configNumberChart.variable= this.makeid(10)//por lo mientras en el fron se genera la variable unica 
           this.widgets.push(JSON.parse(JSON.stringify(this.configNumberChart)))//una manera para evitar la copia por referencia con JSON (no es la mas aceptada) 
       }
       if (this.widgetType == "switch"){
           this.configSwitch.variable= this.makeid(10)//por lo mientras en el fron se genera la variable unica 
           this.widgets.push(JSON.parse(JSON.stringify(this.configSwitch)))//una manera para evitar la copia por referencia con JSON (no es la mas aceptada) 
       }
       if (this.widgetType == "button"){
           this.configButton.variable= this.makeid(10)//por lo mientras en el fron se genera la variable unica 
           this.widgets.push(JSON.parse(JSON.stringify(this.configButton)))//una manera para evitar la copia por referencia con JSON (no es la mas aceptada) 
       }
       if (this.widgetType == "indicator"){
           this.configIndicator.variable= this.makeid(10)//por lo mientras en el fron se genera la variable unica 
           this.widgets.push(JSON.parse(JSON.stringify(this.configIndicator)))//una manera para evitar la copia por referencia con JSON (no es la mas aceptada) 
       }
   },

    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },

    deleteWidget(index){
        this.widgets.splice(index,1);
    }


  }
};
</script>
