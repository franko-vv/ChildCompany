using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    //[Flags]
    public enum Organs : byte
    {
        None = 0x00,
        Heart = 0x01,
        Lung = 0x02,
        Liver = 0x04
    }

    class Program
    {
        static void Main(string[] args)
        {
            byte a = 0x1a, b = 2;
            a+=b;

            Func<int> d;
            d = () => 0;
            int ds = d();
            d += () => 1;
            int dm = d();
            d += () => 2;
            int чч = d();
        }
    }
}
