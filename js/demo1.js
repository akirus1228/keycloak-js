document.addEventListener("DOMContentLoaded", function() {
    // Hide content immediately
    document.body.style.display = 'none';

    const keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'vinas',
        clientId: 'oid-vinas'
    });

    async function initKeycloak() {
        try {
            const authenticated = await keycloak.init({ onLoad: 'login-required' });
            
            if (authenticated) {
                const roles = keycloak.tokenParsed.realm_access.roles;
                console.log('User roles:', roles);

                if (!roles.includes('rol_group1')) {
                    console.log('User does not have access to Demo1');
                    alert('Access Denied: You do not have permission to access this page.');
                    keycloak.logout();
                    return;
                }

                // User has correct role, show the page
                document.body.style.display = 'block';
                console.log('Access granted to Demo1');
                console.log('User:', keycloak.tokenParsed.preferred_username);
            } else {
                console.log('Not authenticated');
                keycloak.login();
            }
        } catch (error) {
            console.error('Failed to initialize Keycloak:', error);
            alert('Authentication Error: ' + (error.message || 'Failed to initialize authentication.'));
            keycloak.logout({
                redirectUri: window.location.origin + '/login.html'
            });
        }
    }

    // Initialize Keycloak
    initKeycloak();

    // Add global logout function with redirect
    window.logout = function() {
        // Redirect to login page after logout
        keycloak.logout({
            redirectUri: window.location.origin + '/login.html'
        }).then(() => {
            // Clear any local storage or session storage if needed
            sessionStorage.clear();
            localStorage.clear();
        }).catch((error) => {
            console.error('Logout failed:', error);
            alert('Logout failed: ' + (error.message || 'An error occurred during logout.'));
            // Fallback redirect
            window.location.href = '/login.html';
        });
    };
});