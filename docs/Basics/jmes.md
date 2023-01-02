---
title: JMES Samples
---
<script type="text/javascript" src="/assets/js/jmes/jmespath.js"></script>

<div class='container-fluid'>
    <div class="row">
      <div class="col-6">
        <input type="text" id="jmes_input" class="form-control">
      </div>
    </div>
    <div class="row mt-2">
        <div class="col-6 left">
          <textarea class="form-control" rows="24" cols="4" id="jmes_src"></textarea>
        </div>
        <div class="col-6 right">
          <textarea class="form-control" rows="24" cols="4" id="jmes_dest" readonly></textarea>
        </div>
    </div>
</div>
<div class="mt-2"></div>
<div class='container-fluid'>
    <div class="row mt-2">
        <div class="col-6 expr-left">
        </div>
        <div class="col-6 expr-right">
        </div>
    </div>
</div>

- ### Basic Expressions
  {: #expr-left}

  - JSON Object
    - Select key
      - [a](#jmes-b-1)
    - Select nested value
      - [e.b.c.d](#jmes-b-1)
  - Array Objects
    - Index Expression
      - [[1]](#jmes-1)
      - Last Index - [[-1]](#jmes-1)
    - Nested Expression
      - [a.b.c[0].d](#jmes-b-2)
      - [a.b.c[*].d[0]](#jmes-b-2)
      - [a.b.c[*].d](#jmes-b-2)
    - Slicing
      - [[1:2]](#jmes-1)
      - [[1:]](#jmes-n-1)
      - Using Step [[::2]](#jmes-n-1)

- ### Advanced Expressions
  {: #expr-right}

  - JSON Object
    - Projections on Arrays
      - [people[*].first](#jmes-ad-1)
    - Projection on Objects
      - [ops.*.numArgs](#jmes-ad-2)
    - Flatten Projection
      - [reservations\[\*\]\.instances\[*\].state](#jmes-ad-3)
  - Array Objects


<script type="text/javascript" src="/assets/js/jmes/jmquery.js"></script>

---

# References
  - [JMES](https://jmespath.org/tutorial.html)