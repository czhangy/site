#!/bin/bash

# Script to create a new React component with TypeScript and CSS Module files
# Usage: ./create-component.sh ComponentName

pascal_to_camel() {
    local input="$1"
    echo "${input,}"
}

# Check if component name is provided
if [ -z "$1" ]; then
    echo "Error: Please provide a component name"
    echo "Usage: ./create-component.sh ComponentName"
    exit 1
fi

COMPONENT_NAME="$1"
COMPONENT_DIR="src/components/$COMPONENT_NAME"
KEBAB_NAME=$(pascal_to_camel $COMPONENT_NAME)

# Check if component directory already exists
if [ -d "$COMPONENT_DIR" ]; then
    echo "Error: Component '$COMPONENT_NAME' already exists in $COMPONENT_DIR"
    exit 1
fi

# Create the component directory
mkdir -p "$COMPONENT_DIR"

# Create the TypeScript React component file
cat > "$COMPONENT_DIR/$COMPONENT_NAME.tsx" << EOF
import React from 'react';
import styles from './$COMPONENT_NAME.module.scss';

interface ${COMPONENT_NAME}Props {
  // Add your props here
}

// JSX
const $COMPONENT_NAME: React.FC<${COMPONENT_NAME}Props> = () => {
  return (
    <div className={styles.${KEBAB_NAME}}>
      <h1>$COMPONENT_NAME Component</h1>
    </div>
  );
};

export default $COMPONENT_NAME;
EOF

# Create the SCSS module file
cat > "$COMPONENT_DIR/$COMPONENT_NAME.module.scss" << EOF
.${KEBAB_NAME} {
  // Add your styles here
}
EOF

echo "✅ Component '$COMPONENT_NAME' created successfully!"
echo "📁 Location: $COMPONENT_DIR"
echo "📄 Files created:"
echo "   - $COMPONENT_NAME.tsx"
echo "   - $COMPONENT_NAME.module.scss" 
echo "   - index.ts"
echo ""
echo "💡 Usage in other components:"
echo "   import $COMPONENT_NAME from '@/components/$COMPONENT_NAME';"