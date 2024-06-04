// services/authService.js
import axios from  'axios';

const authService = {
    async authenticate(bookingId) {
        const customerId = localStorage.getItem('customerId');
        // const hostname = window.location.hostname;
        const hostname = 'bellavida.ibookrestaurant.com';
        // const hostname = 'tamashi.aibooking.cloud';

        const payload = JSON.stringify({
            action: "Authenticate",
            payload: {
                customerId,
                bookingId,
                hostname
            }
        });

        try {
            const res = await axios.post('https://aibooking.cloud/ajax/booking/selam.php', payload);

            if (res.data.errorid === '0') {
                document.title = res.data.payloads.settings.brand;

                const customer = res.data.payloads.customer;
                if (customer && customer.customerId) {
                    localStorage.setItem('customerId', customer.customerId);
                }

                const result = {
                    customer,
                    expired: res.data.payloads.expired,
                    faqs: res.data.payloads.faqs ?? null,
                    requests: res.data.payloads.requests || [],
                    foodStyles: res.data.payloads.foodStyles || [],
                    meals: res.data.payloads.meals ?? null,
                    booking: {
                        date: res.data.payloads.bookableDays[0].date,
                        ...(res.data.payloads.currentBooking || {})
                    },
                    locations: res.data.payloads.locations ?? null,
                    bookableDays: res.data.payloads.bookableDays,
                    settings: res.data.payloads.settings,
                    currentBooking: res.data.payloads.currentBooking,
                    WAVerification: res.data.payloads.currentBooking ? true : customer.WASent,
                    newsletter: res.data.payloads.newsletter,
                    gender: res.data.payloads.currentBooking ? res.data.payloads.currentBooking.gender : customer.gender,
                    birthdate: customer ? customer.birthdate : null
                };

                return { loading: false, result, error: null };
            } else if (res.data.errorid === '0006') {
                return { loading: false, result: null, error: 'unknown' };
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            return { loading: false, result: null, error: error.message };
        }
    }
};

export default authService;
