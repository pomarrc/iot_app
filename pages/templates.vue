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
                v-model="ncConfig.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>
              <!-- unit -->
              <base-input v-model="ncConfig.unit" label="Unit" type="text">
              </base-input>
              <!-- decimal places -->
              <base-input
                v-model="ncConfig.decimalPlaces"
                label="Decimal Places"
                type="number"
              >
              </base-input>
              <!-- var icon -->
              <base-input v-model="ncConfig.icon" label="Icon" type="text">
              </base-input>
              <br />
              <!-- Chart Back Time -->
              <base-input
                v-model="ncConfig.chartTimeAgo"
                label="Char Back Time (mins)"
                type="number"
              >
              </base-input>
              <br />
              <!-- select success -->
              <el-select
                v-model="ncConfig.class"
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
                v-model="ncConfig.column"
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
                v-model="iotSwitchConfig.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>
              <!--icon-->
              <base-input
                v-model="iotSwitchConfig.icon"
                label="Icon"
                type="text"
              ></base-input>
              <br />
              <!--select success-->
              <el-select
                v-model="iotSwitchConfig.class"
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
                v-model="iotSwitchConfig.column"
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
                v-model="iotButtonConfig.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>
              <!--massage to send -->
              <base-input
                v-model="iotButtonConfig.message"
                label="Message to send"
                type="text"
              >
              </base-input>
              <!--button text -->
              <base-input
                v-model="iotButtonConfig.text"
                label="Button Text"
                type="text"
              >
              </base-input>
              <!--icon -->
              <base-input
                v-model="iotButtonConfig.icon"
                label="Icon"
                type="text"
              ></base-input>
              <br />
              <!--select success -->
              <el-select
                v-model="iotButtonConfig.class"
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
                v-model="iotButtonConfig.column"
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
              :config="ncConfig"
            ></Rtnumberchart>
            <Iotswitch
              v-if="widgetType == 'switch'"
              :config="iotSwitchConfig"
            ></Iotswitch>
            <Iotbutton
              v-if="widgetType == 'button'"
              :config="iotButtonConfig"
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
      <div v-for="(widget, index) of widgets" :class="[widget.column]">
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
      ncConfig: {
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
      iotSwitchConfig: {
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
      iotButtonConfig: {
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

  methods: {
   addNewWidget(){
       if (this.widgetType == "numberchart"){
           this.ncConfig.variable= this.makeid(10)//por lo mientras en el fron se genera la variable unica 
           this.widgets.push(JSON.parse(JSON.stringify(this.ncConfig)))//una manera para evitar la copia por referencia con JSON (no es la mas aceptada) 
       }
       if (this.widgetType == "switch"){
           this.iotSwitchConfig.variable= this.makeid(10)//por lo mientras en el fron se genera la variable unica 
           this.widgets.push(JSON.parse(JSON.stringify(this.iotSwitchConfig)))//una manera para evitar la copia por referencia con JSON (no es la mas aceptada) 
       }
       if (this.widgetType == "button"){
           this.iotButtonConfig.variable= this.makeid(10)//por lo mientras en el fron se genera la variable unica 
           this.widgets.push(JSON.parse(JSON.stringify(this.iotButtonConfig)))//una manera para evitar la copia por referencia con JSON (no es la mas aceptada) 
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
    }

  }
};
</script>
