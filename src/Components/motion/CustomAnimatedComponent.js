import {motion} from "framer-motion"

function CustomAnimatedComponent({children, ...props}) {

    return (
        <motion.div {...props}>
                {children}
        </motion.div>
    );
}

export default CustomAnimatedComponent;
