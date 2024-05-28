<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <v-icon @click="prevMonth">mdi-chevron-left</v-icon>
      <h4>{{ monthNames[currentMonth] }} {{ currentYear }}</h4>
      <v-icon @click="nextMonth">mdi-chevron-right</v-icon>
    </div>
    <div class="calendar-grid">
      <div class="calendar-day header" v-for="day in weekDays" :key="day">
        <span>{{ day }}</span>
      </div>
      <div class="calendar-day" v-for="(day, index) in days" :key="index">
        <button
          :class="[
            'day-content',
            { 'd-none': !day.date },
            { outside: day.outside },
            { 'disabled-day': isDisabledDay(day.date) || isPastDay(day.date)},
            { 'selected-day': isSelectedDay(day.date)},
          ]"
          @click="
            !isDisabledDay(day.date) &&
              !isPastDay(day.date) &&
              handleDayClick(day.date)
          "
        >
          <span>{{ day.date ? day.date?.getDate() : "" }}</span>
          <span v-if="dateHasPromotion(day.date)" class="promotion-label">
            {{ getPromotionText(day.date) }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheCalendar",
  props: {
    onDayClick: {
      type: Function,
      required: true,
    },
    showOutsideDays: {
      type: Boolean,
      default: true,
    },
    eventDays: {
      type: Array,
      default: () => [],
    },
    disabledDays: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      days: [],
      monthNames: [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ],
      weekDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      selectedDate: null,
    };
  },
  created() {
    this.updateDays();
  },
  methods: {
    updateDays() {
      this.days = this.generateDays(this.currentYear, this.currentMonth);
    },
    generateDays(year, month) {
      const days = [];
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const numDays = lastDay?.getDate();

      // Add days of previous month to fill the first week
      if (this.showOutsideDays) {
        for (let i = firstDay.getDay(); i > 0; i--) {
          days.unshift({ date: new Date(year, month, 1 - i), outside: true });
        }
      } else {
        // If outside days are disabled, add empty placeholders for the first week
        for (let i = 0; i < firstDay.getDay(); i++) {
          days.push({ date: null, outside: true });
        }
      }

      // Add days of the current month
      for (let i = 1; i <= numDays; i++) {
        days.push({ date: new Date(year, month, i), outside: false });
      }

      // Add days of the next month to fill remaining rows
      if (this.showOutsideDays) {
        const totalDays = days.length;
        const remainingDays = 42 - totalDays; // 6 rows * 7 days
        for (let i = 1; i <= remainingDays; i++) {
          days.push({ date: new Date(year, month + 1, i), outside: true });
        }
      } else {
        const totalDays = days.length;
        const remainingDays = 35 - totalDays; // 5 rows * 7 days
        for (let i = 1; i <= remainingDays; i++) {
          days.push({ date: null, outside: true });
        }
      }
      return days;
    },
    dateHasPromotion(date) {
      if (date === null) {
        return false;
      }
      const formattedDate = date.toLocaleDateString("it-IT");
      return this.eventDays.some((event) => {
        const formattedEventDate = new Date(event.date).toLocaleDateString(
          "en-GB"
        );
        return formattedEventDate === formattedDate;
      });
    },
    getPromotionText(date) {
      if (date === null) {
        return false;
      }
      const formattedDate = date.toLocaleDateString("it-IT");
      const event = this.eventDays.find((event) => {
        const formattedEventDate = new Date(event.date).toLocaleDateString(
          "it-IT"
        );
        return formattedEventDate === formattedDate;
      });
      return event ? event.promotionText : "";
    },
    isDisabledDay(date) {
      return this.disabledDays.includes(date?.toLocaleDateString("it-IT"));
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentYear++;
        this.currentMonth = 0;
      } else {
        this.currentMonth++;
      }
      this.updateDays();
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentYear--;
        this.currentMonth = 11;
      } else {
        this.currentMonth--;
      }
      this.updateDays();
    },
    isPastDay(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    },
    isSelectedDay(date) {
      return date?.getTime() === this.selectedDate?.getTime();
    },
    handleDayClick(date) {
      if (!this.isPastDay(date) && !this.isDisabledDay(date)) {
        this.selectedDate = date;
        this.onDayClick(date);
      }
    },
  },
};
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
}

.calendar-header h4 {
  margin: 0 16px;
}

.calendar-header v-icon {
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;
  width: 100%;
}

.calendar-day {
  display: flex;
  justify-content: center;
  align-items: center;
}

.day-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 44px;
  min-width: 30px;
  aspect-ratio: 1;
  box-shadow: rgb(213, 216, 220) 0 0 0 1px inset;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;
  overflow: hidden;
}

.day-content.outside {
  color: #5a606c;
}

.day-content:hover:not(.disabled-day) {
  background-color: #f1f1f1;
}

.promotion-label {
  width: 100%;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 2px;
  font-size: 10px;
  border-radius: 0 0 4px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.day-content.disabled-day {
  color: #959ba7;
  background-color: #ecedef;
  text-decoration: line-through;
  pointer-events: none;
  cursor: not-allowed;
  box-shadow: none;
}

.header {
  color: #272a2f;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 300;
}

.day-number {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selected-day {
  box-shadow: rgb(0, 0, 0) 0 0 0 1px inset;
  font-weight: 500;
  background-color: rgb(238, 246, 245);
}
</style>
