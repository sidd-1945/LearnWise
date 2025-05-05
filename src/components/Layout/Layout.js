import React, { useState } from 'react';
import { Box, Toolbar, Fab, Tooltip } from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';
import AIAssistant from '../AIAssistant/AIAssistant';
import ThemeCustomizer from '../ThemeCustomizer/ThemeCustomizer';

const drawerWidth = 280;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onSidebarOpen={handleDrawerToggle} />
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <Toolbar />
        {children}

        {/* AI Assistant FAB */}
        <Tooltip title="AI Learning Assistant" placement="left">
          <Fab
            color="primary"
            aria-label="ai-assistant"
            onClick={() => setAiAssistantOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              boxShadow: (theme) => theme.shadows[8],
            }}
          >
            <SmartToy />
          </Fab>
        </Tooltip>

        {/* AI Assistant Drawer */}
        <AIAssistant
          open={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
        />
      </Box>
    </Box>
  );
};

export default Layout;