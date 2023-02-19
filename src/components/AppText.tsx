import { Text, TextProps } from "react-native";

const TextStyles = {
  TITLE: {
    fontSize: 25,
    fontFamily: "DMSans_700Bold",
  },
  SUBTITLE: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
  },
  LABEL: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    opacity: 0.5,
  },
};
// const gray = resolveConfig(tailwindConfig).theme?.colors?.gray?.[500];
// console.log({ gray });

type Props = { variant?: keyof typeof TextStyles } & TextProps;

const AppText: React.FC<Props> = ({ variant = "LABEL", style, ...props }) => {
  return (
    <Text
      className="text-white"
      style={[TextStyles[variant], style]}
      {...props}
    />
  );
};
export default AppText;
