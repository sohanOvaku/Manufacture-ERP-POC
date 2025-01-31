package in.ovaku.ManufacturerErpPoc.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class ConversionUtils {
    public static Double convertKgToTon(double kg) {
        if (kg >= 1000) {
            double tons = kg / 1000; // 1000 kg = 1 ton

            // Round to two decimal places
            BigDecimal roundedTons = new BigDecimal(tons).setScale(2, RoundingMode.HALF_UP);

            // Return value with unit "ton"
            return roundedTons.doubleValue() ;//+ " ton";
        } else {
            // Return value in kg if less than 1000 kg
            return kg;// + " kg";
        }
    }

    private static String getUnit(double value) {
        if (value >= 1000) {
            return "ton";
        } else {
            return "kg";
        }
    }
}
