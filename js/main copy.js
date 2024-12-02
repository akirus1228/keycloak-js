//document.addEventListener("DOMContentLoaded", function() {
    var keyCloak = sessionStorage.getItem("keycloakObj");
    if (keyCloak == null){
        alert("here we are going to init");
    }else{
        alert("Object found");
        if (keyCloak.authenticated){
            alert("key is authenticated");
        }else{
            alert("not authenticated");
        }
    }
    alert(window.location.href);
    // Initialize Keycloak	
    //alert(sessionStorage.getItem("token"));

    const keycloak = new Keycloak({
        url: 'http://localhost:8180',
        realm: 'vinas',
        clientId: 'oid-vinas'
    }); 
    alert("authenticated : "+ keycloak.authenticated);
    //alert(keycloak.token);
    keycloak.init({ onLoad: 'login-required' }).then(function (authenticated) {
    //keycloak.init({ onLoad: 'check-sso' }).then(function (authenticated) {
    
    if (authenticated) {
        var roles = keycloak.tokenParsed.realm_access.roles;
        alert("authenticated");    
        sessionStorage("keycloakObj",keycloak);
        console.log(roles);
        alert(roles);
        if (roles.includes('rol_group1')) {
            console.log("roles");
            window.location.href = '/demo/index.html';
        }else if (roles.includes('rol_group2')) {
            console.log("roles");
            window.location.href = '/demo1/index.html';
        }else if (roles.includes('rol_group2')) {
            console.log("roles");
            window.location.href = '/demo2/index.html';
        }else if (roles.includes('rol_group3')) {
            console.log("roles");
            window.location.href = '/demo3/index.html';
        }else {
            //sessionStorage.removeItem("token");
            keycloak.logout();
            keycloak.login();
        }
        //alert(sessionStorage.getItem("token"));
    } else {
        alert('Not authenticated');
        console.log('Not authenticated');
        keycloak.login();
    }    
    }).catch(function () {
        console.log('Failed to initialize Keycloak');
    });    
//});
