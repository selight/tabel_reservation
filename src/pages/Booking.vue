<template>
  <div class="py-1">
      <v-img
          height="180px"
          cover
          position="top"
          v-if="step!==4"
          src="../assets/tamashiBookingImage.jpg"
      ></v-img>
      <div class="text-center font-weight-bold  text-h5">Tamashi Ramen</div>
      <v-divider class="my-1"></v-divider>
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
              <v-icon left v-if="!stepItem.value" :color="step >= stepItem.step ? 'white' : ''" size="12px">
                {{ stepItem.icon }}
              </v-icon>
              <span v-if="!stepItem.value && step === stepItem.step">{{ stepItem.label }}</span>
              <span v-else>{{ stepItem.value }}</span>

            </v-stepper-step>

          </div>
        </v-stepper-header>

        <v-stepper-items>
          <v-divider class="my-1"></v-divider>
          <v-alert  type="error" prominent outlined  v-show="showAlert">
            <v-row align="center">
              <v-col class="grow">
              {{alert}}
              </v-col>
              <v-col class="shrink">
                <v-btn dense outlined @click="refresh">Ricarica</v-btn>
              </v-col>
            </v-row>

          </v-alert>
          <v-skeleton-loader v-if="loading" type="date-picker-days"></v-skeleton-loader>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12">
                <the-calender
                    v-if="enabledDays.length>0"
                    :on-day-click="onDateChange"
                    :show-outside-days="false"
                    :eventDays="[
                                  { date: '2024/06/29', promotionText: '50%' },
                                  { date: '2024/06/28', promotionText: '20%' },
                                  { date: '2024/06/30', promotionText: '30%' },
                                  { date: '2024/06/31', promotionText: 'Sale' }
                                  ]"
                    :enabled-days="enabledDays"
                    :disabled-days="['30/05/2024']"/>
              </v-col>
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="2">
            <!-- Content for Step 2 -->
            <v-row>
              <v-col cols="12" class="pb-2 d-flex align-center justify-center">
                <v-icon left class="mr-2">mdi-account-outline</v-icon>
                <h3 class="my-0">Numero di Persone</h3>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex flex-wrap justify-center">
              <v-btn v-for="(number, index) in numberOfPersons" :key="index" class="personBtn"
                     :class="{'selected':isSelectedNumberOfPersons(number)}" outlined
                     @click="selectPeople('adults',number)"><span class="px-sm-5 ">{{ number }}</span></v-btn>
            </div>
            <v-divider class="my-3"></v-divider>
            <v-row>
              <v-col cols="12" class="pb-2 d-flex align-center justify-center">
                <v-icon left class="mr-2">mdi-account-outline</v-icon>
                <h3 class="my-0">Numero di bambni</h3>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex flex-wrap justify-center justify-sm-space-around">
              <v-btn v-for="(number, index) in numberOfChildren" :key="index" class="personBtn"
                     :class="{'selected':isSelectedNumberOfChildren(number)}" outlined
                     @click="selectPeople('children',number)"><span class="px-sm-5 ">{{ number }}</span></v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="3">
            <!-- Content for Step 3 -->
            <div v-if="locations?.length>1">
              <v-row>
                <v-col cols="12" class="pb-2 d-flex align-center justify-center">
                  <v-icon left class="mr-2">mdi-map-marker</v-icon>
                  <h3 class="my-0">Scegli la sala</h3>
                </v-col>
              </v-row>
              <v-divider class="my-3"></v-divider>
              <div class=" d-flex flex-wrap justify-center">
                <v-btn v-for="location in locations" :key="location.id" outlined large class="font-weight-bold"
                       :class="{'selected':isSelectedLocation(location.id)}" @click="selectLocation(location.id)">
                  {{ location.name }}
                </v-btn>
              </div>
              <v-divider class="my-3"></v-divider>
            </div>
            <v-row id="time">
              <v-col cols="12" class="pb-2 d-flex align-center justify-center">
                <v-icon left class="mr-2">mdi-clock-outline</v-icon>
                <h3 class="my-0">Scegli l'orario</h3>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <div v-for="(meal, index) in meals" :key="index">
              <v-row v-if="meal.times.length">
                <v-col cols="12" class="mb-2">
                  <h3 class="mb-3">{{ meal.label }}</h3>
                  <v-row class="justify-sm-start justify-space-around">
                    <v-col v-for="(time,index) in meal.times" :key="index" cols="6" sm="3">
                      <v-btn block x-large :class="{'selected': isSelectedTime(time.time)}" class="position-relative" outlined
                             @click="selectTime(time)">
                        <div class="top-text" v-if="time.promotionText">{{time?.promotionText}}</div>
                        <span class=" px-sm-4 ">{{ time.time }}</span>
                        <div :class="getStatusClass(time?.status)" class="time-label">{{ time.status }}</div>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider v-if="meal.times.length" class="my-3"></v-divider>
            </div>
          </v-stepper-content>
          <v-stepper-content step="4">
            <!--            Content for step 4-->
            <customer-information-tabs-component :isBookingComplete="isBookingComplete"/>
              <div  class="mx-auto text-center mt-3 " style="max-width: 300px ">
                <div class="text-bottom-caption">Clica qui per cancellare i tuoi dati personali dal nostro database</div>
                <a href="#" class="text-subtitle-2 my-2 text--accent-1"><v-icon left size="14px">mdi-account-outline</v-icon>CANCELLAMI</a>
                <div class="text-bottom-caption font-weight-bold">I dati personali forniti saranno trattati nel respetto della normativa vigente secondo quanto indicato nell'informativa Privacy disponible a questo LINK</div>
               </div>

          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
  </div>
</template>

<script>
import theCalender from "../components/theCalender.vue";
import authService from '../service/authService';
import {TimeStatus, generateTimeSlots, getStatusClass} from "@/utils/utils";
import CustomerInformationTabsComponent from "@/components/customerInformationTabsComponent.vue";

export default {
  name: 'BookingPage',
  data() {
    return {
      step: 1,
      selectedDate: null,
      minDate: new Date().toISOString().substring(0, 10),
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().substring(0, 10),
      lunchTimes: [],
      dinnerTimes: [],
      numberOfPersons: Array.from({length: 16}, (_, i) => i + 1),
      numberOfChildren: Array.from({length: 5}, (_, i) => i),
      steps: [
        {step: 1, icon: 'mdi-calendar-month-outline', label: 'Data', value: ''},
        {step: 2, icon: 'mdi-account-outline', label: 'Persone', value: ''},
        {step: 3, icon: 'mdi-clock-outline', label: 'Orario', value: ''},
        {step: 4, icon: 'mdi-information-outline', label: 'Dati Prenotazione', value: ''},
      ],
      completedSteps: new Set(),
      bookingId: '',
      booking: {
        date: null,
        mealId: null,
        optIn: false,
        newsletter: false,
        gender: null,
        birthdate: null
      },
      locations: null,
      bookableDays: [],
      enabledDays: [],
      selectedLocation: null,
      selectedChildren: 0,
      selectedNumberOfPeople: 0,
      loading: false,
      alert: 'Impossibile recuperare le date disponibili, fare clic qui per aggiornare.',
      showAlert:false,
      isBookingComplete: null,
    };
  },
  computed:{
    meals() {
      return [
        { label: 'Pranzo', times: this.lunchTimes },
        { label: 'Cena', times: this.dinnerTimes },
      ];
    },
  },
  watch: {
    step(newStep) {
      this.resetStepsAfter(newStep);
    },
  },
  components: {
    CustomerInformationTabsComponent,
    theCalender,
  },
  methods: {
    getStatusClass,
    goToStep(stepNumber) {
      if (this.isStepComplete(stepNumber - 1) || stepNumber === 1) {
        this.step = stepNumber;
        this.isBookingComplete= this.step < 4 ? false : null;
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
      const selectedDay = this.bookableDays.find((day) => day.date === date.toLocaleDateString('it-IT'));
      if (selectedDay.isLUNCH_OPEN) {
        let generatedLunchtimes = generateTimeSlots(12, 0, 6, 30);
        this.lunchTimes=[];
        this.lunchTimes = generatedLunchtimes.map(time => ({
          time: time,
          status: TimeStatus.DISPONIBLE,
          promotionText: time==='12:00' ? 'Bevanda Omaggio' : null
        }));
      }
      if (selectedDay.isDINNER_OPEN) {
        let generatedDinnerTimes = generateTimeSlots(19, 0, 6, 30);
        this.dinnerTimes=[];
        this.dinnerTimes = generatedDinnerTimes.map(time => ({
          time: time,
          status: TimeStatus.DISPONIBLE,
          promotionText: time==='19:00' ? 'Bevanda Omaggio' : null
        }));
      }
      // format the date to show the date number and month name shortened
      date = new Date(date).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
      });
      this.steps[0].value = date;
      this.completeStep(1)
      this.goToStep(2)
    },
    selectTime(time) {
      this.steps[2].value = time.time;
      this.completeStep(3);
      this.goToStep(4);
    },
    isSelectedTime(time) {
      return this.steps[2].value === time;
    },
    selectPeople(type,number) {
      if(type === 'adults'){
        this.selectedNumberOfPeople = number;
      }else if(type === 'children'){
        this.selectedChildren = number;
      }
      if (this.selectedChildren > 0 && this.selectedNumberOfPeople > 0) {
        this.steps[1].value = this.selectedNumberOfPeople + ' + ' + this.selectedChildren + ' persone';
      }else if(this.selectedChildren > 0){
        this.steps[1].value = this.selectedChildren + ' bambini';
      }
      else {
        this.steps[1].value = this.selectedNumberOfPeople + ' persone';
      }
      if (this.selectedNumberOfPeople) {
        this.completeStep(2);
        this.goToStep(4);
      }
    },
    isSelectedNumberOfPersons(number) {
      return this.selectedNumberOfPeople === number;
    },
    isSelectedNumberOfChildren(number) {
      return this.selectedChildren === number;
    },
    selectLocation(location) {
      this.selectedLocation = location;
    },
    isSelectedLocation(location) {
      return this.selectedLocation === location;
    },
    refresh(){
      //reload the page
      this.showAlert = false;
      window.location.reload();
    },
    updateEnabledDays() {
      this.enabledDays = this.bookableDays.map((day) => day.date);
    },
    async authenticate() {
      this.loading=true;
      const {result, error} = await authService.authenticate(this.bookingId);
      this.loading=false;
      if (error) {
        this.showAlert = true;
        throw error
      } else {
        const {locations, bookableDays, settings} = result;
        return {locations, bookableDays, settings};
      }
    }
  },
  async created() {
    const {bookableDays, locations, settings} = await this.authenticate()
    this.numberOfPersons = Array.from({length: settings?.options?.maxBookableCovers}, (_, i) => i + 1);
    this.bookableDays = bookableDays
        .filter((day) => day.isDAY_OPEN)
        .map((day) => {
          return {
            date: new Date(day?.date).toLocaleDateString('it-IT'),
            isDINNER_OPEN: day.isDINNER_OPEN,
            isLUNCH_OPEN: day.isLUNCH_OPEN,
          };
        });
    this.locations = locations;
    this.updateEnabledDays();
  }

};
</script>

<style scoped>
.text-center {
  text-align: center;
}

div ::v-deep .v-stepper {
  box-shadow: none !important;
}

div ::v-deep .v-stepper__step__step {
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

div ::v-deep .v-stepper__label {
  text-align: center !important;
  max-height: 13px !important;
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
  height: 100px;
  width: 100px;
  position: relative;
}


.time-label {
  position: absolute;
  bottom: -22px;
  text-align: center;
  padding: 2px 6px;
  font-size: 10px;
  text-transform: none;
  background-color: gray;
  font-weight: bold;
}
.top-text{
  position: absolute;
  top: -15px;
  text-align: center;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 2px;
  letter-spacing: 0;
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
  box-shadow: rgb(0, 51, 46) 0 0 0 1px inset, rgb(189, 219, 216) 0 0 0 3px inset;
  font-weight: 600;
  background-color: rgb(238, 246, 245);
}

.d-flex {
  gap: 11px;
}

.personBtn {
  max-width: 84px;
  min-width: 50px !important;
  letter-spacing: 0 !important;
}
.text-bottom-caption {
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0;
  font-weight: 500;
}
a {
  color: #40637d !important;
}
.sticky-toolbar{
  position: sticky;
  top: 0;
  background-color: white;
}
</style>
