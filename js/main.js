document.addEventListener("DOMContentLoaded", function() {
    // Hide content immediately
    document.body.style.display = 'none';

    const keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'vinas',
        clientId: 'oid-vinas'
    }); 

    keycloak.init({ onLoad: 'login-required' }).then(function (authenticated) {
        if (authenticated) {
            var roles = keycloak.tokenParsed.realm_access.roles;
            console.log('Authenticated with roles:', roles);
            
            // Redirect based on role without showing any content
            if (roles.includes('rol_group1')) {
                window.location.replace('/demo1/index.html');
            } else if (roles.includes('rol_group2')) {
                window.location.replace('/demo2/index.html');
            } else if (roles.includes('rol_group3')) {
                window.location.replace('/demo3/index.html');
            } else {
                window.location.replace('/unauthorized.html');
            }
        } else {
            console.log('Not authenticated');
            keycloak.login();
        }
    }).catch(function (error) {
        console.error('Failed to initialize Keycloak:', error);
        window.location.replace('/error.html');
    });    
});