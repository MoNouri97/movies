import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Typography, { AppTextProps } from "~/components/Typography";

const TruncatedText = ({ numberOfLines, ...props }: AppTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
      <Typography {...props} numberOfLines={isExpanded ? undefined : numberOfLines} />
      {!isExpanded && <Typography className="text-purple-400">Read More</Typography>}
    </TouchableOpacity>
  );
};
export default TruncatedText;
