<template>
  <v-container class="pa-2 ">
    <v-card flat>
      <v-img
      height="200px"
      cover
      position="top"
      src="../assets/tamashiBookingImage.jpg"
    ></v-img>
 
      <div  class="text-center font-weight-bold  text-h5">Tamasshi Restorant</div>
      <v-divider></v-divider>
     
      <v-stepper v-model="step" class="my-4" dense>
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
              <v-icon left :color="step >= stepItem.step ? 'white' : ''" size="small">{{ stepItem.icon }}</v-icon>
              <span v-if="!stepItem.value && step === stepItem.step">{{ stepItem.label }}</span>
              <span v-else>{{ stepItem.value }}</span>

            </v-stepper-step>

          </div>
        </v-stepper-header>
       
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12">
                <the-calender :on-day-click="onDateChange"
                              :show-outside-days="false"
                              :eventDays="[
                                  { date: '2024/05/27', promotionText: '50%' },
                                  { date: '2024/05/28', promotionText: '20%' },
                                  { date: '2024/05/30', promotionText: 'ibook' },
                                  { date: '2024/05/31', promotionText: 'Sale' }
  ]"
                              :disabled-days="['30/05/2024']"/>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2">
            <!-- Content for Step 2 -->
            <v-row>
              <v-col cols="12" class="pb-2 text-center ">
                <h3>Scegli la sala</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center ">
                <v-btn outlined large class="mr-3 font-weight-bold">Interno</v-btn>
                <v-btn outlined large class="font-weight-bold">Dehor</v-btn>
              </v-col>
            </v-row>
            <v-divider class="ma-3"></v-divider>
            <v-row>
              <v-col cols="12" class="pb-2 text-center ">
                <h3>Scegli l'orario</h3>
              </v-col>
            </v-row>
            <v-divider class="ma-3"></v-divider>
            <v-row>
              <v-col cols="12" class="pb-2 ">
                <h3>Pranzo</h3>
                <v-btn large class=" ma-2 position-relative" outlined v-for="time in lunchTimes" :key="time"
                       @click="selectTime(time)">

                  <span class="px-6">{{ time }}</span>
                  <div class="time-label">Disponible</div>

                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class=" pt-2 ">
                <h3>Cena</h3>
                <v-btn large class=" ma-2 position-relative " outlined v-for="time in dinnerTimes" :key="time"
                       @click="selectTime(time)">
                  <span class="px-6 ">{{ time }}</span>
                  <div class="time-label">Disponible</div>
                </v-btn>
              </v-col>
            </v-row>

          </v-stepper-content>

          <v-stepper-content step="3">
            <!-- Content for Step 3 -->
            <v-row>
              <v-col cols="12" class="pb-2 text-center">
                <h3>Numero di persone</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" v-for="(number, index) in numberOfPersons" :key="index" class="text-center">
                <v-btn class="mx-2 my-1 btn-large" outlined @click="selectNumberOfPersons(number)">{{ number }}</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-2 text-center">
                <h4>Children requiring high chair?</h4>
              </v-col>
              <v-col col="12" v-for="(number,index) in [1,2,3,4]" :key="index" class="text-center">
                <v-btn class="mx-2 my-1 btn-large" outlined @click="selectNumberOfPersons(number)">{{ number }}</v-btn>
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

export default {
  name: 'BookingPage',
  data() {
    return {
      step: 1,
      selectedDate: null,
      minDate: new Date().toISOString().substr(0, 10),
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().substr(0, 10),
      lunchTimes: [],
      dinnerTimes: [],
      selectedTime: null,
      selectedNumberOfPersons: null,
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
    submitForm() {
      console.log('Form submitted');
      // Handle form submission logic
    },
    onDateChange(date) {

      // format the date to show the date number and month name shortned
      date = new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      });
      this.steps[0].value = date;
      this.generateTimeSlots();
      this.completeStep(1)
      this.goToStep(2)
    },
    generateTimeSlots() {
      // Clear previous time slots
      this.lunchTimes = [];
      this.dinnerTimes = [];

      // Generate lunch time slots (12:00 PM - 3:00 PM)
      for (let hour = 12; hour < 15; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          this.lunchTimes.push(time);
        }
      }

      // Generate dinner time slots (6:00 PM - 9:00 PM)
      for (let hour = 18; hour < 21; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          this.dinnerTimes.push(time);
        }
      }
      this.step = 2
    },
    selectTime(time) {
      this.steps[1].value = time;
      this.completeStep(2);
      this.goToStep(3);
    },
    selectNumberOfPersons(number) {
      this.steps[2].value = number;
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

div ::v-deep .v-stepper__step__step {
  display: none !important;
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
}

.step {
  min-width: 0;
  flex: 1 1 auto;
  position: relative;
  padding: 0.6rem;
  font-size: 13px;
  color: white;

}

.step.active::after {
  content: '';
  position: absolute;
  right: -20px; /* Adjust according to the arrow size */
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 20px solid black; /* Same color as the button */
  z-index: 1;
}

.step.active {
  background-color: black !important;
  color: white;
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
  background-color: green;
  font-weight: bold;
}

</style>
