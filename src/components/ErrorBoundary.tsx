import React from 'react';


export class ErrorBoundary extends React.Component<any, {hasError: boolean}> {
constructor(props: any){
super(props);
this.state = { hasError: false };
}
static getDerivedStateFromError(){
return { hasError: true };
}
componentDidCatch(error: any, info: any){
console.error('ErrorBoundary caught', error, info);
}
render(){
if(this.state.hasError) return <div className="p-6 bg-red-50 rounded">Ocorreu um erro. Recarregue a página.</div>;
return this.props.children;
}
}


export default ErrorBoundary;
