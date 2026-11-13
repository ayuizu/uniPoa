export function formatValue(key, value) {
    if (key == 'intensity') {
        const customIntensityLabel = {
            BARELY_NOTICEABLE: "Quase imperceptível",
            MILD_DISCOMFORT: "Leve desconforto",
            MODERATE_INTENSITY: "Intensidade moderada",
            SEVERE_PAIN: "Dor severa",
            UNBEARABLE: "Insuportável"
        }
        if (customIntensityLabel[value]) return customIntensityLabel[value];
    }
    if (key == 'frequencyUnit') {
        const customFrequencyLabel = {
            MINUTES: "Minutos",
            HOURS: "Horas",
            DAYS: "Dias",
            WEEKS: "Semanas",
            MONTHS: "Mêses",
            SPORADICALLY: "Esporádico",
        }
        if (customFrequencyLabel[value]) return customFrequencyLabel[value];
    }
    if (key == 'registerDate' || key == 'endDate' || key == 'startDate' || key == 'checkTime' || key == 'date' || key == 'checkDate') {
        const date = new Date(value);

        const formatter = new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "medium", // Medium format for the date
            timeStyle: "short", // Short format for the time
        });
        return formatter.format(date);
    }
    if (key == 'applicationDate') {
        const date = new Date(value);

        const formatter = new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "medium", // Medium format for the date
        });
        return formatter.format(date);
    }
    if (key == 'heartRate') {
        return value + " BPM"
    }
    return value;

};

const customLabels = {
    name: "Nome",
    intensity: "Intensidade",
    registerDate: "Data",
    description: "Descrição",
    frequencyValue: "Frequência",
    frequencyUnit: "Intervalo",
    endDate: "Data de fim",
    startDate: "Data de início",
    doseValue: "Dosagem",
    doseUnit: "Unidade",
    applicationDate: "Data de aplicação",
    checkTime: "Medição",
    date: "Data",
    checkDate: "Data",
    address: "Endereço",
    doctorsName: "Especialista",
    systolicPressure: "Pressão Sistólica",
    diastolicPressure: "Pressão Diastólica",
    heartRate: "Batimentos",
    weight: "Peso"
};

export function formatKey(key) {
    if (customLabels[key])
        return customLabels[key];
    return key;
};