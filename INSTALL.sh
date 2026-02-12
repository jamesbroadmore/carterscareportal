#!/bin/bash
# Carters Care Platform - Installation Script (Linux/Mac)

echo ""
echo "========================================"
echo "Carters Care Group - Platform Setup"
echo "========================================"
echo ""

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="Carters Care Platform"

echo "Installing $APP_NAME..."
echo "Location: $APP_DIR"
echo ""

if [ ! -f "$APP_DIR/index.html" ]; then
    echo "ERROR: Application files not found!"
    echo "Please ensure this script is in the Carters_Care_Platform directory."
    exit 1
fi

echo "Setting up application directories..."
mkdir -p "$APP_DIR/src/css"
mkdir -p "$APP_DIR/src/js"

echo ""
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "To start using the application:"
echo "1. Open index.html in your web browser"
echo "2. Or run: open index.html (Mac) or xdg-open index.html (Linux)"
echo ""
echo "Quick Start Tips:"
echo "- Go to Settings to configure your organization"
echo "- Add Clients from the Clients menu"
echo "- Add Staff from the Staff menu"
echo "- Create Shifts from the Schedule menu"
echo ""
echo "For more information, see README.md"
echo ""
