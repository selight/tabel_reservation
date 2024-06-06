const TimeStatus = {
    DISPONIBLE: 'Disponible',
    POSTI_ESAURITI: 'Posti Esauriti',
    LISTA_D_ATTESA: "Lista d'attesa",
    NON_DISPONIBLE: 'Non Disponible'
};
const BookingStatus = {
    EFFETTUATA: 'Effettuata',
    CONFERMATA: 'Confermata',
    LISTA_D_ATTESA: "Lista d'attesa",
}
const getStatusClass = (status) => {
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
}
const generateTimeSlots= (startHour, startMinute, slotCount, intervalMinutes) => {
    return Array.from({length: slotCount}, (_, i) => {
        const time = new Date(2024, 5, 1, startHour, startMinute);
        time.setMinutes(time.getMinutes() + i * intervalMinutes);

        return time.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})

    });
}
export { getStatusClass, TimeStatus,generateTimeSlots,BookingStatus };