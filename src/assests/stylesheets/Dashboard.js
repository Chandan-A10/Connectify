export const styles = {
    sider: {
        backgroundColor: '#1F1E23',
        borderRight: '2px solid #27282F',
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
    },
    logo: { 
        marginTop: '10px' 
    },
    leftmenu: { 
        backgroundColor: '#1F1E23' 
    },
    divider: { 
        borderColor: '#27282F', 
        borderWidth: '3px' 
    },
    layout: { 
        backgroundColor: '#16191C', 
        height: 'auto', 
        marginLeft: 200 
    },
    header: {
        marginLeft: 'auto',
        borderBottom: '2px solid #27282F',
        backgroundColor: '#1F1E23',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'right',
        gap:'1rem',
        alignItems: 'center'
    },
    profileContainer: { 
        display: 'flex', 
        alignItems: 'center', 
    },
    name: { 
        marginRight: '8px', 
        fontWeight: 'bold', 
        color: 'white' 
    },
    topnav: { 
        display: 'flex', 
        marginRight: '30%', 
        alignItems: 'center', 
        height: '80%', 
        backgroundColor: '#27282F' 
    },
    postContainer: {
        margin: '24px 20px 10px',
        overflow: 'initial',
    },
    post: {
        marginTop:'1%',
        width: '60vw',
        padding: 10,
        textAlign: 'center',
        background: '#1F1E23',
        border: '2px solid #27282F',

    },
    trending: { 
        marginTop: '24px', 
        position: 'fixed', 
        right: 17 
    },
    trendContainer: { 
        height: 200, 
        width: 250, 
        backgroundColor: '#27282F' 
    },
    friends: { 
        marginTop: '10px', 
        height: 300, 
        width: 250, 
        backgroundColor: '#27282F' 
    }
}
