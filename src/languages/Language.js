import LocalizedStrings from "react-native-localization";
import English from "./English";
import Urdu from "./Urdu";

const Language = new LocalizedStrings({
    "en": English,
    ur: Urdu,

});

export default Language
