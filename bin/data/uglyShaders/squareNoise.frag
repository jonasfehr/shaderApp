//Based on Andrew Baldwin's noise tutorial: http://thndl.com/?15

//uniforms
//tempodivision 1]
uniform vec2 u_resolution;//100,1000;100,1000]
uniform float u_time;//-0.5,0.5]
uniform float division;//-0.5,0.5]
//uniforms

float rand(vec2 p, float timeOffset)
{
    p += 0.2127*timeOffset + p.x + 0.3713*p.y;
    vec2 r = (123.789)*sin(1.823*(p));
    return fract(r.x*r.y);
}

float sn(vec2 p, float timeOffset)
{
    vec2 i=floor(p-u_time);
    vec2 f=fract(p+division);
    f = f*f*f*(f*(f*6.0-15.0)+6.0);
    float rt=mix(rand(i, timeOffset),rand(i+vec2(1.,0.), timeOffset),f.x);
    float rb=mix(rand(i+vec2(0.0,1.0), timeOffset),rand(i+vec2(1.0,1.0), timeOffset),f.x);
    return mix(rt,rb,f.y);
}

void main()
{
    //vec2 r=fract(456.789*sin(789.123*c.xy));
    //f=vec4(r.x*r.y)
    
    //create random noise
    //vec2 r = 123.0*sin(1.823*fragCoord.xy);
    
    
    vec2 p = gl_FragCoord.xy*vec2(0.012);
    
    //fragColor = vec4(vec3(sn(vec2(0.02)*fragCoord.xy)),1.0);
    gl_FragColor = vec4(vec3(
                          0.5*sn(p, 1.0)
                          +0.25*sn(2.0*p, 1.0)
                          +0.125*sn(4.0*p, 1.0)
                          +0.0625*sn(8.0*p, sin(1.*0.00025))
                          +0.03125*sn(16.0*p, sin(u_time*0.00032))
                          +0.015*sn(32.0*p, sin(1.*0.00046))
                          ),1.);
}