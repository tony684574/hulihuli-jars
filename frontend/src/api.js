export async function fetchJars() {
    const res = await fetch('http://localhost:5000/api/jars');
    return res.json();
}