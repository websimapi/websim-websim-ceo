import React from 'react';
import * as WebsimSocket from 'websim-socket';

const WEBSIM_CONFIG_COLLECTION = 'websim_config_v1';
const room = new WebsimSocket.WebsimSocket();

const DEFAULT_CONFIG_DATA = {
    // Core display fields
    name: 'My Awesome Websim Project',
    logo_url: '/assets/websim_default_logo.png', 
    
    // Required JSON columns (1-3 active use)
    col1_json: { 
        landing_page_content: "Welcome to my custom Websim! This is the default landing page content.",
        theme: "light",
        custom_code: "// Add custom JS/CSS here if needed.",
    }, // General Configuration & Appearance
    col2_json: { 
        ai_enabled: false,
        system_prompt: "You are a friendly and helpful assistant.",
        initial_message: "Hello! Ask me anything about this Websim!",
    }, // AI configuration data
    col3_json: { 
        schemas: [], // Database definitions for the user's custom Websim
    }, // Database Schemas
    
    // Required JSON columns (4-12 empty placeholders)
    col4_json: {},
    col5_json: {},
    col6_json: {},
    col7_json: {},
    col8_json: {},
    col9_json: {},
    col10_json: {},
    col11_json: {},
    col12_json: {},
};

class WebsimService {
    constructor() {
        this.currentUser = null;
        this.initPromise = this.initialize();
    }

    async initialize() {
        this.currentUser = await window.websim.getCurrentUser();
        
        // Wait for connection and initial records fetch
        await new Promise(resolve => {
             // We ensure we wait for at least one sync cycle for the user filter query
             room.collection(WEBSIM_CONFIG_COLLECTION)
                .filter({ username: this.currentUser.username })
                .subscribe((configs) => {
                    if (configs !== null) {
                        resolve(configs);
                    }
                });
        }).then(async (configs) => {
            if (configs.length === 0) {
                 console.log("Creating initial config for user:", this.currentUser.username);
                 await room.collection(WEBSIM_CONFIG_COLLECTION).create(DEFAULT_CONFIG_DATA);
            }
        });
    }
    
    async getCurrentUser() {
        await this.initPromise;
        return this.currentUser;
    }

    /**
     * Retrieves the current user's config record.
     */
    useCurrentUserConfig() {
        const [config, setConfig] = React.useState(null);
        
        React.useEffect(() => {
            let unsubscribe = () => {};
            
            this.initPromise.then(async () => {
                const currentUser = await this.getCurrentUser();
                
                // Get the specific config row for the current user
                const filter = { username: currentUser.username };
                
                unsubscribe = room.collection(WEBSIM_CONFIG_COLLECTION)
                    .filter(filter)
                    .subscribe((configs) => {
                        // There should only be one config per user
                        if (configs && configs.length > 0) {
                            setConfig(configs[0]);
                        }
                    });
            });

            return () => {
                unsubscribe();
            };
        }, []);

        return config;
    }
    
    useAllConfigs() {
        const [configs, setConfigs] = React.useState([]);
        
        React.useEffect(() => {
            const unsubscribe = room.collection(WEBSIM_CONFIG_COLLECTION).subscribe((allConfigs) => {
                // Return reversed list so newer configurations appear first, or keep standard (newest last for gallery)
                // Since this is a gallery, order doesn't strictly matter, let's just display what we get.
                setConfigs(allConfigs || []);
            });
            
            return () => unsubscribe();
        }, []);
        
        return configs;
    }

    async updateConfig(configId, updates) {
        if (!configId) {
            throw new Error("Config ID required for update.");
        }
        await room.collection(WEBSIM_CONFIG_COLLECTION).update(configId, updates);
    }
    
    async uploadFile(file) {
        try {
            const url = await websim.upload(file);
            return url;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}

export const websimService = new WebsimService();

