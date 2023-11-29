export const fetching = async (url) => {
    const res = fetch(url, { next: { tags: ["mi-etiqueta-de-cache"]}, });

    if(!res.ok) {
        const errorData = await res.json();
        let customMsg = res.statusText
        
        
    }
}