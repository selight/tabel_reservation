<template>
  <v-container>
    <v-card flat max-width="600px">
      <v-img
      height="200px"
      cover
      position="top"
      src="../assets/tamashiBookingImage.jpg"
    ></v-img>

      <div  class="text-center font-weight-bold  text-h5">Tamashi Ramen</div>
      <v-divider class="my-2"></v-divider>

      <v-stepper v-model="step" dense>
        <v-stepper-header dense>
          <div v-for="(stepItem, index) in steps " :key="index">
            <v-stepper-step
                class="step"
                :class="{'active ': step === stepItem.step, 'completed': step > stepItem.step}"
                :complete="step > stepItem.step"
                :step="stepItem.step"
                :editable="step > stepItem.step"
                @click="goToStep(stepItem.step)"
            >
              <v-icon left v-if="!stepItem.value" :color="step >= stepItem.step ? 'white' : ''" size="12px">{{ stepItem.icon }}</v-icon>
              <span v-if="!stepItem.value && step === stepItem.step">{{ stepItem.label }}</span>
              <span v-else>{{ stepItem.value }}</span>

            </v-stepper-step>

          </div>
        </v-stepper-header>

        <v-stepper-items>
          <v-divider class="my-2"></v-divider>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12">
                <the-calender :on-day-click="onDateChange"
                              :show-outside-days="false"
                              :eventDays="[
                                  { date: '2024/05/29', promotionText: '50%' },
                                  { date: '2024/05/28', promotionText: '20%' },
                                  { date: '2024/05/30', promotionText: '30%' },
                                  { date: '2024/05/31', promotionText: 'Sale' }
  ]"
                              :disabled-days="['30/05/2024']"/>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2">
            <!-- Content for Step 2 -->
            <v-row>
              <v-col cols="12" class="pb-2 d-flex align-center justify-center">
                <v-icon left class="mr-2">mdi-map-marker</v-icon>
                <h3 class="my-0">Scegli la sala</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center ">
                <v-btn outlined large class="mr-3 font-weight-bold">Interno</v-btn>
                <v-btn outlined large class="font-weight-bold">Dehor</v-btn>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row>
              <v-col cols="12" class="pb-2 d-flex align-center justify-center">
                <v-icon left class="mr-2">mdi-clock-outline</v-icon>
                <h3 class="my-0">Scegli l'orario</h3>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row>
              <v-col cols="12" class="mb-2">
                <h3 class="mb-3">Pranzo</h3>
                <v-row class="justify-sm-start justify-space-around">
                  <v-col v-for="time in lunchTimes" :key="time.time" cols="auto">
                    <v-btn large :class="{'selected': isSelectedTime(time.time)}"  class="position-relative" outlined @click="selectTime(time)">
                      <span class="px-4">{{ time.time }}</span>
                      <div  :class="getStatusClass(time.status)" class="time-label">{{time.status}}</div>
                    </v-btn>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>
             <v-divider class="my-3"></v-divider>
            <v-row>
              <v-col cols="12" class="mb-2 ">
                <h3 class="mb-3">Cena</h3>
                <v-row class="justify-sm-start justify-space-around">
                  <v-col v-for="time in dinnerTimes" :key="time.time" cols="auto">
                    <v-btn large :class="{'selected': isSelectedTime(time.time)}"  class="position-relative" outlined @click="selectTime(time)">
                      <span class=" px-4">{{ time.time }}</span>
                      <div  :class="getStatusClass(time.status)" class="time-label">{{time.status}}</div>
                    </v-btn>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>

          </v-stepper-content>

          <v-stepper-content step="3">
            <!-- Content for Step 3 -->
            <v-divider class="my-3"></v-divider>
            <v-row>
              <v-col cols="12" class="pb-2 d-flex align-center justify-center">
                <v-icon left class="mr-2">mdi-account-outline</v-icon>
                <h3 class="my-0">Numero di Persone</h3>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row class="justify-center justify-sm-start">
              <v-col cols="auto" v-for="(number, index) in numberOfPersons" :key="index" class="text-center">
                <v-btn large :class="{'selected':isSelectedNumberOfPersons(number)}"  outlined @click="selectNumberOfPersons(number)"><span class="px-sm-6 ">{{ number }}</span></v-btn>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row>
              <v-col cols="12" class="pb-2 d-flex align-center justify-center">
                <v-icon left class="mr-2">mdi-account-outline</v-icon>
                <h3 class="my-0">Numero di bambni</h3>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row class="justify-center justify-sm-start">
              <v-col col="auto" v-for="(number,index) in [1,2,3,4,5]" :key="index" class="text-center">
                <v-btn large outlined @click="selectNumberOfPersons(number)"><span class="px-sm-6 ">{{ number }}</span></v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="4">
            <!--            Content for step 4-->
            <information-tabs-component/>
            <v-row>
              <v-col cols="12" class="text-center mt-3">
                <v-btn color="primary" block @click="submitForm">Prenota</v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script>
import informationTabsComponent from "../components/informationTabsComponent.vue";
import theCalender from "../components/theCalender.vue";
const TimeStatus = {
  DISPONIBLE: 'Disponible',
  POSTI_ESAURITI: 'Posti Esauriti',
  LISTA_D_ATTESA: "Lista d'attesa",
  NON_DISPONIBLE: 'Non Disponible'
};
export default {
  name: 'BookingPage',
  data() {
    return {
      step: 1,
      selectedDate: null,
      minDate: new Date().toISOString().substr(0, 10),
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().substr(0, 10),
      lunchTimes: [{time: '12:00',status:'Disponible'}, {time: '12:30',status: 'Posti Esauriti'}, {time: '13:00', status: "Lista d'attesa"}, {time: '13:30', status: 'Non Disponible'}, {time: '14:00',status: 'Non Disponible'}, {time: '14:30',status: 'Disponible'}],
      dinnerTimes: [{time: '19:00', status: "Lista d'attesa"}, {time: '19:30', status: 'Non Disponible'}, {time: '20:00',status: 'Non Disponible'}, {time: '20:30',status: 'Disponible'}, {time: '21:00',status: 'Disponible'}, {time: '21:30',status: 'Disponible'}],
      numberOfPersons: Array.from({length: 12}, (_, i) => i + 1),
      steps: [
        {step: 1, icon: 'mdi-calendar-month-outline', label: 'Data', value: ''},
        {step: 2, icon: 'mdi-clock-outline', label: 'Orario', value: ''},
        {step: 3, icon: 'mdi-account-outline', label: 'Persone', value: ''},
        {step: 4, icon: 'mdi-information-outline', label: 'Dati Prenotazione', value: ''},
      ],
      completedSteps:new Set(),
    };
  },
  watch: {
    step(newStep) {
      this.resetStepsAfter(newStep);
    },
  },
  components: {
    informationTabsComponent,
    theCalender,
  },
  methods: {
    goToStep(stepNumber) {
      if (this.isStepComplete(stepNumber - 1) || stepNumber === 1) {
        this.step = stepNumber;
      }
    },
    completeStep(stepNumber) {
      this.completedSteps.add(stepNumber);
      this.step++;
    },
    isStepComplete(stepNumber) {
      return this.completedSteps.has(stepNumber);
    },
    resetStepsAfter(step) {
      this.steps.forEach((stepItem) => {
        if (stepItem.step > step) {
          stepItem.value = null;
          this.completedSteps.delete(stepItem.step);
        }
      });
    },
    submitForm() {
      console.log('Form submitted');
      // Handle form submission logic
    },
    onDateChange(date) {

      // format the date to show the date number and month name shortned
      date = new Date(date).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
      });
      this.steps[0].value = date;
      this.completeStep(1)
      this.goToStep(2)
    },
    getStatusClass(status) {
      switch (status) {
        case TimeStatus.DISPONIBLE:
          return 'status-disponible';
        case TimeStatus.POSTI_ESAURITI:
          return 'status-posti-esauriti';
        case TimeStatus.LISTA_D_ATTESA:
          return 'status-lista-d-attesa';
        case TimeStatus.NON_DISPONIBLE:
          return 'status-non-disponible';
        default:
          return '';
      }
    },
    selectTime(time) {
      this.steps[1].value = time.time;
      this.completeStep(2);
      this.goToStep(3);
    },
    isSelectedTime(time) {
      return this.steps[1].value === time;
    },
    isSelectedNumberOfPersons(number) {
      return this.steps[2].value === number;
    },
    selectNumberOfPersons(number) {
      this.steps[2].value = number + ' persone';
      this.completeStep(3);
      this.goToStep(4);
    }
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
div ::v-deep .v-stepper {
   box-shadow: none !important;
}
div ::v-deep .v-stepper__step__step{
  display: none !important;
}
div ::v-deep .v-stepper__header .v-ripple__container {
  display: none !important;
}
div ::v-deep .v-stepper__content {
  padding: 0 !important;
}
@media only screen and (max-width: 959.98px) {
  div ::v-deep .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: block !important;
    text-align: center;
    white-space: nowrap;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
div ::v-deep  .v-stepper__label {
    text-align: center !important;
}

div ::v-deep .v-stepper__header {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4 - 0.5rem), 1fr)); /* Each step will take 1/4 of the available space */
  border-radius: 10px;
  background-color: rgb(238, 246, 245);
  overflow: hidden;
  flex: 1 1 0;
  align-items: center;
  height: auto !important;
  box-shadow: none;
}

.step {
  min-width: 0;
  flex: 1 1 auto;
  position: relative;
  padding: 0.6rem;
  font-size: 13px;
  color: white;
  line-height: 13px;
}

.step.active::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 0.125rem;
  z-index: 1;
  transform: rotate(45deg);
  background-color: #000000;
  transform-origin: right top;
  right: calc(-1.075rem);
  top: 50%;
}

.step.active {
  background-color: black !important;
  color: white;
}
.step.active span {
  position: relative;
  z-index: 2;
  font-size: 13px;
}

div ::v-deep .v-stepper__step--active {
  background-color: black !important;
  color: white;
}

.step.completed {
  background-color: black;
  color: white;
}

.step.completed ::v-deep .v-stepper__label {
  color: white !important;
}

.step.completed::after {
  content: "";
  position: absolute;
  width: 1px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1rem;
  background-color: rgb(238, 246, 245);

}


div ::v-deep .v-stepper__step--active .v-stepper__label {
  color: white !important;
  text-shadow: 0 0 0 white !important;
}

div ::v-deep .v-stepper__step--editable:hover {
  background: black !important;
}

v-icon {
  margin: 0 10px;
}

.day-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px; /* Adjust as needed */
  width: 100px; /* Adjust as needed */
  position: relative;
}


.time-label {
  position: absolute;
  bottom: -20px;
  text-align: center;
  padding: 2px 6px;
  font-size: 10px;
  text-transform: none;
  background-color: gray;
  font-weight: bold;
}
.status-disponible {
  background-color: green;
}

.status-posti-esauriti {
  background-color: gray;
}

.status-lista-d-attesa {
  background-color: orange;
}

.status-non-disponible {
  background-color: gray;
}
.selected {
  box-shadow: rgb(0, 0, 0) 0 0 0 1px inset;
  font-weight: 600;
  background-color: rgb(238, 246, 245);
}
</style>
