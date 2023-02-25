import { useState } from "react";
import { TouchableOpacity } from "react-native";
import AppText, { AppTextProps } from "~/components/AppText";

const TruncatedText = ({ numberOfLines, ...props }: AppTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
      <AppText
        {...props}
        numberOfLines={isExpanded ? undefined : numberOfLines}
      />
      {!isExpanded && <AppText className="text-purple-400">Read More</AppText>}
    </TouchableOpacity>
  );
};
export default TruncatedText;
