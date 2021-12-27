module.exports = {

    stringMin: "Cantidad de caracteres en '{field}' deber ser mayor o igual a {expected}, Actual: {actual}",
    stringMax: "Cantidad de caracteres en '{field}' deber ser menor o igual a {expected}, Actual: {actual}",
    required: "'{field}' es requerido",
    string: "'{field}' debe ser texto",
    stringEmpty: "'{field}' no debe estar vacío",
    stringLength: "La longitud de '{field}' debe ser de {expected} caracteres",
    stringPattern: "'{field}' no coincide con el patrón requerido",
    stringContains: "'{field}' must contain the '{expected}' text",
    stringEnum: "'{field}' does not match any of the allowed values",
    stringNumeric: "'{field}' debe ser texto numerico",
    stringAlpha: "'{field}' debe ser un texto alfabetico",
    stringAlphanum: "'{field}' debe ser un texto alfanumerico",
    stringAlphadash: "'{field}' debe ser an alphadash texto",
    stringHex: "'{field}' debe ser hex texto",
    stringSingleLine: "'{field}' debe ser single line texto",
    number: "'{field}' debe ser numerico",
    numberMin: "'{field}' debe ser mayor o igual a {expected}",
    numberMax: "'{field}' debe ser menor o igual a {expected}",
    numberEqual: "'{field}' debe ser igual a {expected}",
    numberNotEqual: "'{field}' no debe ser igual a {expected}",
    numberInteger: "'{field}' debe ser un entero",
    numberPositive: "'{field}' debe ser numero positivo",
    numberNegative: "'{field}' debe ser numero negativo",
    array: "'{field}' debe ser un array",
    arrayEmpty: "'{field}' no debe ser un array vacío",
    arrayMin: "'{field}' must contain at least {expected} items",
    arrayMax: "'{field}' must contain less than or equal to {expected} items",
    arrayLength: "'{field}' must contain {expected} items",
    arrayContains: "'{field}' must contain the '{expected}' item",
    arrayUnique: "The '{actual}' value in '{field}' field does not unique the '{expected}' values",
    arrayEnum: "The '{actual}' value in '{field}' field does not match any of the '{expected}' values",
    tuple: "'{field}' debe ser an array",
    tupleEmpty: "'{field}' no debe ser un array vacío",
    tupleLength: "'{field}' must contain {expected} items",
    boolean: "'{field}' debe ser boolean",
    function: "'{field}' debe ser function",
    date: "'{field}' debe ser una fecha válida",
    dateMin: "'{field}' debe ser mayor o igual a {expected}",
    dateMax: "'{field}' debe ser menor o igual a {expected}",
    forbidden: "'{field}' is forbidden",
    email: "'{field}' debe ser una cuenta de correo válida",
    url: "'{field}' debe ser valid URL",
    enumValue: "'{field}' value '{expected}' does not match any of the allowed values",
    equalValue: "'{field}' value debe ser equal to '{expected}'",
    equalField: "'{field}' value debe ser equal to '{expected}' field value",
    object: "The '{field}' debe ser an Object",
    objectStrict: "The object '{field}' contains forbidden keys: '{actual}'",
    objectMinProps: "The object '{field}' must contain at least {expected} properties",
    objectMaxProps: "The object '{field}' must contain {expected} properties at most",
    uuid: "'{field}' debe ser valid UUID",
    uuidVersion: "'{field}' debe ser valid UUID version provided",
    mac: "'{field}' debe ser valid MAC address",
    luhn: "'{field}' debe ser valid checksum luhn",
    selection: "Selecciona un elemento de '{field}'",
    /*custom*/
    curp: "CURP inválida",
    personalPlantillaAsignado: "El personal requerido ya se encuentra en la plantilla: '{actual}', del plantel: '{expected}'",
    file: "Archivo '{expected}', aun no ha sido cargado",
    totalplazasdisponibles: "No existen vacantes, según la categoría y plantel seleccionados, vacantes: '{actual}'",
    totalautorizadasalplantel: "No existen vacantes para el plantel, según la categoría seleccionada, vacantes: '{actual}'",
    totalplazasautorizadas: "No existen plazas autorizadas en la zona, según la categoría y plantel seleccionados, autorizadas: '{actual}'",
    confirmPass: "La confirmación de contraseña no coincide con el campo contraseña",
    existeCombinacionCategoriastabular: "Existe ya registro para la combinación Categoría y Tipo de plantel",
    usuarioLibre: "La personal con el CURP '{actual}', ya tiene asignado el usuario de sistema '{expected}' ",
    horasPlazas: "Registre las plazas u horas autorizadas segun sea su selección ",
    quincenaFin: "La quincena final no puede ser menor a la quincena inicial ",
    horasAcumuladas: "Las horas acumuladas de '{actual}' en la zona del plantel, superan a las horas autorizadas de '{expected}'",
    unique: "El valor '{actual}' ya existe en la Base de Datos",
    uniqueRecord: "El registro ya existe en la Base de Datos",
    quincenaCalculada: "La quincena inicial ya fue calculada, por lo tanto ya no se pueden hacer modificaciones extras a la quincena de cierre",
    plazaHorasSueltasNoExiste: "No existe una plaza del tipo 'Horas sueltas' asignada al profesor, requerida para asignar las horas restantes",
    horasNoDisponiblesEnPlaza: "No existen horas disponibles para la plaza de jornada, seleccione una plaza de horas sueltas en la vista anterior",
};