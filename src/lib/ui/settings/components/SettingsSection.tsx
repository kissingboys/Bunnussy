import { NavigationNative } from "@metro/common";
import { useProxy } from "@/lib/api/storage";
import { getAssetIDByName } from "@/lib/api/assets";
import { getScreens } from "@ui/settings/data";
import { ErrorBoundary, Forms } from "@ui/components";
import { settings } from "@lib/settings";
import { Strings } from "@/core/i18n";

const { FormRow, FormSection, FormDivider } = Forms;

export default function SettingsSection() {
    const navigation = NavigationNative.useNavigation();
    useProxy(settings);

    const screens = getScreens()

    return (
        <ErrorBoundary>
            <FormSection key="Vendetta" title={`${Strings.BUNNY}${settings.safeMode?.enabled ? ` (${Strings.SAFE_MODE})` : ""}`}>
                {screens.filter(s => (s.shouldRender?.() ?? true)).map((s, i) => (
                    <>
                        <FormRow
                            label={s.title}
                            leading={<FormRow.Icon source={getAssetIDByName(s.icon!)} />}
                            trailing={FormRow.Arrow}
                            onPress={() => navigation.push(s.key)}
                        />
                        {i !== screens.length - 1 && <FormDivider />}
                    </>
                ))}
            </FormSection>
        </ErrorBoundary>
    )
}